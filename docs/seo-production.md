# SEO production - Smart'Immo Coaching

## Domaine canonique
- Domaine retenu: `https://smartimmocoaching.com`
- `www` redirige en `301` vers non-`www`.

## Canonicalisation
- Balise canonical ajoutée sur:
  - `/`
  - `/mentions-legales`
  - `/politique-confidentialite`
- Toutes les URLs canoniques sont en `https` et non-`www`.

## robots.txt
- Fichier: `/robots.txt`
- Politique:
  - `Allow: /`
  - `Sitemap: https://smartimmocoaching.com/sitemap.xml`

## Sitemap XML
- URL: `/sitemap.xml`
- Généré via route Kirby.
- Pages incluses:
  - `/`
  - `/mentions-legales`
  - `/politique-confidentialite`

## Open Graph / Twitter
- Balises ajoutées dans `site/snippets/head.php`:
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:image`
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `og:image`/`twitter:image` utilisent une URL absolue HTTPS non-`www`.

## Données structurées (JSON-LD)
- Type: `ProfessionalService`
- Présent uniquement sur la home.
- Données incluses uniquement si fiables:
  - `name`, `url`, `description`, `image`
  - `email` uniquement si non-placeholder
  - `telephone` uniquement si non-placeholder

## Actions manuelles à faire
1. Ajouter la propriété `https://smartimmocoaching.com` dans Google Search Console.
2. Soumettre `https://smartimmocoaching.com/sitemap.xml`.
3. Vérifier l’indexation et la couverture.
4. Créer/optimiser Google Business Profile.
5. Garder les données NAP cohérentes (nom, adresse, téléphone).
6. Remplacer les placeholders légaux avant communication large.

## Points à compléter côté client (si disponibles)
- Numéro de téléphone réel (remplace placeholder).
- Adresse professionnelle confirmée.
- Zone desservie officielle (si souhaité en SEO local avancé).
- Liens sociaux officiels (pour `sameAs`).
