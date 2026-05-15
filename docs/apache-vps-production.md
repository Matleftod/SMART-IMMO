# Apache VPS production (Kirby Smart'Immo)

Cette doc fournit une base de configuration Apache 2.4 pour déployer le site Kirby sur VPS.

## 1) Prérequis Apache

Activer les modules requis:

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod expires   # optionnel (cache statique)
sudo systemctl reload apache2
```

## 2) VirtualHost HTTP (redirection HTTPS)

```apache
<VirtualHost *:80>
    ServerName smartimmocoaching.fr
    ServerAlias www.smartimmocoaching.fr

    Redirect permanent / https://smartimmocoaching.fr/
</VirtualHost>
```

## 3) VirtualHost HTTPS (Kirby)

```apache
<VirtualHost *:443>
    ServerName smartimmocoaching.fr
    ServerAlias www.smartimmocoaching.fr

    DocumentRoot /var/www/smart-immo

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/smartimmocoaching.fr/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/smartimmocoaching.fr/privkey.pem

    <Directory /var/www/smart-immo>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Defense in depth (in addition to .htaccess)
    <DirectoryMatch "^/var/www/smart-immo/(site|kirby|vendor|\\.git)">
        Require all denied
    </DirectoryMatch>

    <DirectoryMatch "^/var/www/smart-immo/content">
        <FilesMatch "\\.(txt|md|markdown|yml|yaml|json)$">
            Require all denied
        </FilesMatch>
    </DirectoryMatch>

    <FilesMatch "^(composer\\.(json|lock)|package\\.json|pnpm-lock\\.yaml|\\.env|\\.env\\..*|phpunit\\.xml)$">
        Require all denied
    </FilesMatch>

    <FilesMatch "\\.(log|sql|sqlite|db|bak|backup|old|swp|env)$">
        Require all denied
    </FilesMatch>

    # Security headers (reasonable baseline)
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

    # Enable only once HTTPS is stable for this domain
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

    # Optional static cache policy
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
        ExpiresByType image/jpeg "access plus 1 month"
        ExpiresByType image/png "access plus 1 month"
        ExpiresByType image/webp "access plus 1 month"
        ExpiresByType image/x-icon "access plus 1 month"
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/smart-immo-error.log
    CustomLog ${APACHE_LOG_DIR}/smart-immo-access.log combined
</VirtualHost>
```

## 4) Notes CSP (a traiter apres recette)

Ne pas appliquer une CSP stricte sans tests complets.

Lucide est auto-heberge en local: `assets/vendor/lucide/lucide.min.js` (v0.468.0), ce qui simplifie la future CSP.

## 5) .htaccess Kirby

Le projet inclut maintenant un `.htaccess` racine qui:
- active la rewrite Kirby vers `index.php`,
- bloque les dossiers sensibles (`site/`, `kirby/`, `vendor/`, fichiers cachés),
- bloque les fichiers texte/config dans `content/`.

Pre-requis: `AllowOverride All` sur le `DocumentRoot`.

## 6) Checklist de verification apres deploiement

```bash
apachectl configtest
sudo systemctl reload apache2

curl -I http://smartimmocoaching.fr/
curl -I https://smartimmocoaching.fr/
curl -I https://smartimmocoaching.fr/panel
curl -I https://smartimmocoaching.fr/assets/css/style.css
curl -I https://smartimmocoaching.fr/media/
curl -I https://smartimmocoaching.fr/site/config/config.php
curl -I https://smartimmocoaching.fr/content/home/home.txt
curl -I https://smartimmocoaching.fr/.git/config
curl -I https://smartimmocoaching.fr/composer.json
```

Resultats attendus:
- HTTP -> HTTPS: redirection.
- Home HTTPS: `200`.
- Assets CSS/JS/images: `200`.
- Panel: `302` vers login ou `200` sur login.
- Fichiers sensibles: `403` ou `404`.

## 7) Points a adapter au VPS final

- Domaine (`ServerName`, `ServerAlias`).
- Chemin projet (`DocumentRoot`).
- Certificats Let's Encrypt (chemins `SSLCertificate*`).
- Politique HSTS (si sous-domaines reels et HTTPS stable).
- Eventuelle CSP en mode `Report-Only` avant enforcement.
