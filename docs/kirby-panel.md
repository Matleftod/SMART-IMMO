# Kirby Panel - Guide d'administration minimal

## Objectif
Documenter la base back-office actuelle de Smart'Immo Coaching sans élargir le périmètre éditable front.

## Périmètre actuel

### Champs globaux (`site/blueprints/site.yml`)
Groupe **Identité du site**:
- `siteTitle` (texte)

Groupe **Contact**:
- `contactEmail` (email)
- `contactPhone` (tel)

### Champs SEO pages
Pages concernées:
- `home`
- `mentions-legales`
- `politique-confidentialite`

Champs disponibles:
- `title` (titre interne Panel)
- `seoTitle`
- `metaDescription`

## Ce que le client peut modifier
- Les champs globaux d'identité/contact.
- Les champs SEO des 3 pages (Accueil + pages légales).

## Ce qui n'est pas modifiable pour l'instant
- Les sections de la home (hero, méthode, offres, bénéfices, calculateur, contact, etc.).
- Les contenus détaillés des pages légales en champs structurés.
- Toute architecture blocks/builder.

## Règles de fallback (front)

### `<title>` (`site/snippets/head.php`)
- Home: `seoTitle` -> `siteTitle` -> `title`
- Légales: `seoTitle` -> `title - siteTitle` -> `title`

### `<meta name="description">`
- Rendu uniquement si `metaDescription` est non vide.

### Contact footer (`site/snippets/footer.php`)
- `contactEmail`: fallback `contact@smartimmocoaching.fr`
- `contactPhone`: fallback `06.XX.XX.XX.XX`

## Propagation des champs globaux
- `siteTitle` alimente les occurrences d'identité du site (head SEO, logo alt/aria, copyright, mentions légales pertinentes).
- `contactEmail` alimente les e-mails visibles et les liens `mailto:` (footer, section contact, pages légales pertinentes).
- `contactPhone` alimente les numéros visibles et les liens `tel:` (footer, section contact, pages légales pertinentes).
- Les CTA "contact" utilisent désormais l'ancre interne `#contact` (ou `/#contact` hors home) pour rester cohérents avec la navigation one-page.

## Règles avant mise en production
- Vérifier les coordonnées finales (email/téléphone/URL) avant publication.
- Ne pas laisser de placeholder téléphone en production.
- Renseigner `seoTitle` et `metaDescription` pour les pages importantes.

## Vérification après modification Panel
1. Vérifier la home et les pages légales en navigateur.
2. Vérifier le `<title>` de chaque page.
3. Vérifier que le footer affiche des liens/valeurs valides.
4. Vérifier qu'aucun rendu front n'a changé.

## Commandes utiles
- Lancer Kirby: `php -S localhost:8000 kirby/router.php`
- Vérifier JS: `node --check assets/js/*.js`
- Vérifier PHP:
  - `php -l site/snippets/head.php`
  - `php -l site/snippets/footer.php`
  - `php -l site/templates/home.php`
- Vérifier routes:
  - `curl -I http://localhost:8000/`
  - `curl -I http://localhost:8000/mentions-legales`
  - `curl -I http://localhost:8000/politique-confidentialite`
- Smoke tests:
  - `pnpm run test:smoke`

## Gestion des images
- Voir [docs/images-management.md](/Users/mat/Pro/SMART-IMMO/docs/images-management.md) pour la gestion des images locales et des champs image de la home.
- Les textes alternatifs des images se gèrent au niveau de chaque fichier image (blueprint `image`).
