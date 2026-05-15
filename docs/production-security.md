# Production / Sécurité Kirby (Smart'Immo Coaching)

Cette checklist couvre la mise en ligne du site sur un hébergement PHP.

Configuration Apache VPS detaillee:
- `docs/apache-vps-production.md`

## 1) Configuration Kirby
- `site/config/config.php` : `debug` doit rester à `false` en production.
- Le debug local est activé via :
  - `site/config/config.localhost.php`
  - `site/config/config.127.0.0.1.php`
- Ne pas activer `debug` en prod (risque d'exposition d'erreurs sensibles).

## 2) HTTPS (obligatoire)
- Le site doit être servi uniquement en HTTPS.
- Mettre en place une redirection HTTP -> HTTPS côté serveur/proxy.
- Vérifier que les URLs publiques ne restent pas en `http://` après déploiement.

## 3) Headers sécurité (côté serveur)
À configurer côté Apache/Nginx/hébergeur :
- `Strict-Transport-Security` (si HTTPS déjà actif)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy` (ex: `strict-origin-when-cross-origin`)
- `X-Frame-Options: SAMEORIGIN` (ou `frame-ancestors` via CSP)
- `Content-Security-Policy` progressive (tester avant durcissement)

## 4) Dossiers/fichiers à protéger
Ne pas exposer publiquement :
- `site/`
- `content/*.txt`
- `vendor/`
- `.git/`
- `composer.json`, `composer.lock`
- `package.json`, `pnpm-lock.yaml`

En local avec `php -S`, certains de ces fichiers peuvent répondre en 200 :
ce comportement ne doit pas être utilisé comme référence de sécurité production.

## 5) Runtime Kirby (sessions/cache/media)
- `site/sessions/` et `site/cache/` sont runtime et ignorés par Git.
- `media/` contient des dérivés d'images générés ; stratégie recommandée :
  - régénérer côté serveur (ne pas versionner) ou
  - versionner seulement si votre process de déploiement l'exige explicitement.
- Purge cache (si nécessaire) : supprimer le contenu de `site/cache/`.

## 6) Panel et comptes
- `/panel` doit rediriger vers login pour les visiteurs non authentifiés.
- Utiliser des mots de passe forts.
- Supprimer les comptes inutilisés avant mise en ligne.
- Réserver l'accès Panel aux personnes autorisées.

## 7) Permissions serveur (à appliquer chez l'hébergeur)
- Lecture pour le code applicatif.
- Écriture PHP uniquement sur les dossiers runtime nécessaires :
  - `content/` (si édition Panel)
  - `media/`
  - `site/cache/`
  - `site/sessions/`
  - `site/accounts/` (si gestion utilisateurs Panel)

## 8) Vérifications avant mise en ligne
1. `composer validate`
2. `node --check assets/js/*.js`
3. `php -l` sur templates/snippets
4. Routes publiques en 200 (`/`, `/mentions-legales`, `/politique-confidentialite`)
5. `/panel` redirige vers `/panel/login`
6. Aucune URL image distante non voulue
7. Aucune fuite de secrets dans le repo
