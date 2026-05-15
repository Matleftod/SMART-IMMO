# Front Architecture - Smart'Immo Coaching

## Objectif de cette documentation
Ce document fige l'architecture front actuelle avant toute nouvelle phase CMS Kirby.
Le rendu visuel est considéré validé: les évolutions futures doivent préserver ce rendu par défaut.

## Stack et principes
- CMS: Kirby 5.4.x
- Front: templates/snippets PHP + CSS/JS statiques
- Tests E2E smoke: Playwright
- Gestionnaire Node: pnpm
- Principe: patch minimal, sans redesign implicite

## Structure générale
- `site/templates/`: templates Kirby par page
- `site/snippets/`: snippets globaux partagés
- `site/snippets/sections/`: sections de la home
- `assets/css/`: point d'entrée CSS + fichiers thématiques
- `assets/js/`: scripts front découpés par fonctionnalité
- `tests/e2e/`: smoke tests Playwright
- `docs/`: documentation technique front

## Templates Kirby
- `site/templates/home.php`
  - Assemble la home via snippets globaux + snippets de sections.
- `site/templates/mentions-legales.php`
  - Page légale Kirby pour les mentions légales.
- `site/templates/politique-confidentialite.php`
  - Page légale Kirby pour la politique de confidentialité.

## Snippets globaux
- `site/snippets/head.php`
  - Doctype, head HTML, title, CSS global, favicon, preload home.
  - Charge `snippet('scripts')` uniquement sur la home.
- `site/snippets/header.php`
  - Header global, nav desktop.
  - Menu mobile inclus uniquement sur la home.
- `site/snippets/footer.php`
  - Footer global, navigation, liens légaux Kirby.
- `site/snippets/scripts.php`
  - Ordre de chargement JS front pour la home.

## Snippets de sections home
Dossier: `site/snippets/sections/`
- `hero.php`
- `about.php`
- `method.php`
- `journey.php`
- `offers.php`
- `calculator.php`
- `sales-blockers.php`
- `benefits.php`
- `contact.php`

La home (`home.php`) assemble ces sections dans l'ordre ci-dessus.

## Organisation CSS
Point d'entrée:
- `assets/css/style.css`

Ordre d'imports actuel (à conserver):
1. `00-core-legacy.css`
2. `01-reveal-legacy.css`
3. `sections/hero.css`
4. `sections/about.css`
5. `sections/method.css`
6. `sections/journey.css`
7. `sections/offers-base.css`
8. `sections/benefits.css`
9. `sections/contact.css`
10. `sections/home-refinements.css`
11. `sections/home-responsive.css`
12. `03-home-reveal.css`
13. `sections/hero-overrides.css`
14. `sections/method-overrides.css`
15. `sections/journey-overrides.css`
16. `sections/offers-overrides.css`
17. `sections/home-consistency.css`
18. `sections/sales-blockers.css`
19. `sections/footer-tweaks.css`
20. `pages/legal.css`
21. `sections/offers.css`
22. `07-brand-responsive-overrides.css`

Remarque:
- Le rendu dépend de la cascade actuelle. Ne pas réordonner sans validation visuelle + smoke tests.

## Organisation JS
Scripts chargés via `site/snippets/scripts.php` (home uniquement), en `defer`, dans cet ordre:
1. `assets/vendor/lucide/lucide.min.js` (Lucide UMD auto-hébergé, v0.468.0)
2. `assets/js/00-lucide.js`
3. `assets/js/01-reveals.js`
4. `assets/js/02-mobile-menu.js`
5. `assets/js/03-offers-scroll-hint.js`
6. `assets/js/04-benefits.js`
7. `assets/js/05-calculator.js`
8. `assets/js/06-hero-parallax.js`
9. `assets/js/07-journey-timeline.js`
10. `assets/js/main.js` (fichier de compatibilité)

Rôle des fichiers JS:
- `00-lucide.js`: initialise les icônes Lucide.
- `01-reveals.js`: reveals progressifs au scroll.
- `02-mobile-menu.js`: menu mobile (open/close, fermeture au clic/Escape/outside).
- `03-offers-scroll-hint.js`: hint mobile de scroll horizontal section offres.
- `04-benefits.js`: interactions section bénéfices (ARIA + panneau actif).
- `05-calculator.js`: logique calculateur (modes, formatage, résultat).
- `06-hero-parallax.js`: effet parallax hero.
- `07-journey-timeline.js`: progression timeline au scroll.
- `main.js`: point d'entrée conservé pour compatibilité.

## Smoke tests Playwright
- Specs: `tests/e2e/smoke.spec.js`
- Config: `playwright.config.js`
- Doc d'usage: `docs/front-smoke-tests.md`

Couverture:
- Home desktop: rendu de base + interactions critiques (bénéfices/calculateur).
- Home mobile: menu mobile + comportement offres mobile.
- Pages légales: rendu structurel + absence d'erreurs runtime/ressources critiques.

## Commandes utiles
Installation:
- `pnpm install`
- `pnpm exec playwright install chromium`

Run local Kirby:
- `php -S localhost:8000 kirby/router.php`

Validation technique:
- `node --check assets/js/*.js`
- `php -l site/templates/home.php`
- `php -l site/templates/mentions-legales.php`
- `php -l site/templates/politique-confidentialite.php`
- `php -l site/snippets/head.php`
- `php -l site/snippets/header.php`
- `php -l site/snippets/footer.php`
- `php -l site/snippets/scripts.php`
- `php -l site/snippets/sections/*.php`

Smoke tests:
- `pnpm run test:smoke`
- `pnpm run test:e2e`

Vérification HTTP rapide:
- `curl -I http://localhost:8000/`
- `curl -I http://localhost:8000/mentions-legales`
- `curl -I http://localhost:8000/politique-confidentialite`
- `curl -I http://localhost:8000/assets/css/style.css`
- `curl -I http://localhost:8000/favicon.ico`

## Règles avant modification
- Ne pas modifier le rendu sans vérification visuelle explicite.
- Ne pas changer l'ordre des imports CSS sans test visuel + smoke tests.
- Ne pas changer l'ordre des scripts JS sans test visuel + smoke tests.
- Ne pas modifier les snippets de sections sans vérifier la home complète.
- Ne pas rendre une section éditable avant validation front dédiée.
- Relancer `node --check assets/js/*.js` après modification JS.
- Relancer `php -l` sur les fichiers PHP modifiés.
- Relancer `pnpm run test:smoke` après modification front.

## Non-régression attendue
- Aucun redesign implicite.
- Aucun changement de texte non demandé.
- Aucune suppression des comportements JS critiques.
- Aucune dégradation des routes Kirby publiques (`/`, `/mentions-legales`, `/politique-confidentialite`).
