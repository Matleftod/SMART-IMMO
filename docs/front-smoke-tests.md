# Front Smoke Tests

## Prérequis
- Installer les dépendances Node du repo:

```bash
pnpm install
```

- Lancer Kirby localement:

```bash
php -S localhost:8000 kirby/router.php
```

- Installer le navigateur Playwright (une seule fois si nécessaire):

```bash
pnpm exec playwright install chromium
```

## Lancer les tests smoke

```bash
pnpm run test:smoke
```

Ou directement:

```bash
pnpm exec playwright test tests/e2e/smoke.spec.js --config=playwright.config.js
```

Pour lancer toute la suite E2E:

```bash
pnpm run test:e2e
```

Pour ouvrir une trace Playwright en local:

```bash
pnpm exec playwright show-trace test-results/<run>/trace.zip
```

## Périmètre couvert
- Home (`/`):
- rendu de base (header, CTA, sections clés)
- menu mobile (open/close)
- interaction bénéfices
- interaction calculateur
- comportement horizontal de la section offres en mobile
- Pages légales (`/mentions-legales`, `/politique-confidentialite`):
- rendu header/footer
- présence des liens vers sections home
- surveillance des erreurs runtime/console

## Détection d'erreurs
Les tests échouent si:
- erreur JavaScript runtime (`pageerror`)
- erreur console (`console.error`)
- HTTP >= 400 sur ressources importantes (`document`, `script`, `stylesheet`, `fetch`, `xhr`)

## Limites
- Ce sont des smoke tests: ils ne couvrent pas tous les parcours métier.
- Les images distantes (ex: Unsplash) ne sont pas traitées comme ressources bloquantes.

## Quand les relancer
- Après toute modification JS front
- Après modification des snippets de sections home
- Après changement du chargement des scripts dans `head.php` / `scripts.php`
