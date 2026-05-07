# PROJECT NOTES - SMART'IMMO

Memo de reprise pour une nouvelle conversation Codex.
Objectif: donner assez de contexte pour intervenir sans refaire l'historique.

## 1) Contexte projet

- Projet: site vitrine one-page `Smart'Immo Coaching`.
- Positionnement: coaching immobilier independant, premium, sobre, humain, editorial.
- Langue du site: francais.
- Etat actuel: phase de finition / polish front-end, pas de refonte globale.
- Priorite utilisateur: desktop-first, rendu premium, lisibilite, coherence entre sections, corrections ciblees.
- Style a eviter: SaaS generique, cartes repetitives trop IA, tableaux administratifs froids, effets decoratifs inutiles.

## 2) Regles de travail importantes

- Travailler section par section sauf demande explicite de passe globale.
- Ne pas modifier la copy client sans demande explicite.
- Ne pas changer une section deja validee si le scope ne la concerne pas.
- Pour les changements front-end design, utiliser explicitement Impeccable avec la commande demandee ou la plus adaptee:
  - `/prompts:layout` pour structure/layout
  - `/prompts:adapt` pour responsive/adaptation
  - `/prompts:polish` pour finition ciblee
  - `/prompts:optimize` pour perf/render/animations
  - `/prompts:typeset` pour typo
- Reponse finale attendue: courte, concrete, en francais, avec fichiers modifies et verifications faites.

## 3) Fichiers principaux

- Page principale: `concept-01.html`
- Styles globaux: `styles.css`
- Interactions JS: `animations.js`
- Pages legales: `mentions-legales.html`, `politique-confidentialite.html`
- Assets locaux: `logo.png`, `profile_picture.jpg`
- Notes projet: `PROJECT_NOTES.md` (ce fichier)
- Regles agent: `AGENTS.md`

## 4) Etat git connu

- Branche: `main`
- Dernier commit connu: `5d71659 fix stamp`
- Historique recent utile:
  - `5d71659` fix stamp
  - `865f1d1` fix responsive tableau
  - `79092bb` fix offres
  - `fee991d` fix 640px a propos
  - `5a86d64` fix a propos + add pp
  - `d5105f2` fix nav mobile
  - `41e8fb8` opti effect
  - `f737b77` clear css
  - `bcd346f` polish benef
  - `91d1097` polish offres
  - `9fdf567` polish calculator
  - `e4ec0c8` Add site footer and legal pages

Attention: verifier `git status --short` avant toute modification. Des fichiers peuvent etre non suivis ou modifies.

## 5) Structure actuelle de `concept-01.html`

Sections dans l'ordre:

1. Header sticky avec navigation desktop, navigation mobile et CTA.
2. Hero / accueil.
3. `#apropos` (`about-redesign`) avec portrait `profile_picture.jpg`.
4. `#methode` en triptyque Avant / Pendant / Apres.
5. `#marche` / Deroule de l'accompagnement, section de reference visuelle.
6. `#offres` / Offres et comparaison, avec tableau comparatif visible directement.
7. `#calculateur` / Simulation du cout de vente.
8. `#blocages` / Freins a la vente, interaction icones + panneau actif.
9. `#benefices` / Benefices et garanties, interaction type tabs.
10. `#contact`.
11. Footer complet avec navigation, contact et liens legaux.

## 6) Etat des interactions JS

Dans `animations.js`:

- Reveals progressifs via `[data-reveal]`.
  - `reveal-ready` est ajoute seulement quand les reveals sont actifs.
  - fallback si `prefers-reduced-motion` ou pas d'`IntersectionObserver`.
  - fallback viewport apres 900ms pour eviter des contenus invisibles.
  - `beforeprint` force tout visible.
- Menu mobile:
  - bouton `.mobile-menu-toggle`
  - panneau `#mobile-navigation`
  - gere `aria-expanded`, fermeture sur lien, clic externe et Escape.
- `#blocages`:
  - rail d'items compacts + panneaux de detail.
  - hover/click desktop, dernier hover conserve.
  - icones Lucide via `data-lucide`.
- `#benefices`:
  - modele ARIA tabs (`role=tablist`, `role=tab`, `role=tabpanel`).
  - navigation clavier prevue.
  - ne pas remettre `aria-pressed`.
- `#calculateur`:
  - prix de vente, mode pourcentage/forfait exclusifs, resultat live.
  - labels et etats accessibles deja passes en polish.
- Lucide:
  - CDN dans `concept-01.html`.
  - initialisation via `window.lucide.createIcons`.

## 7) Etat precis de `#offres`

Section tres sensible, beaucoup modifiee recemment.

Structure actuelle:

- Tableau comparatif directement visible.
- Pas de bouton repliable.
- Pas de categories.
- Table HTML semantique: `<table class="offers-table">`.
- Wrapper:
  - `.offers-comparison.offers-comparison--table`
  - `.offers-table-scroll`
- Stamp recommande:
  - stamp desktop dans la cellule `PACK COUP DE MAITRE`: `.offers-table__flag`
  - stamp mobile/tablette scroll: `.offers-table__mobile-flag` place en overlay dans `.offers-comparison--table`
- Option additionnelle sous tableau:
  - `Prestation disponible a la demande du client`
  - `Avis de valeur`
  - `200€ TTC`

Ordre DOM desktop des colonnes:

1. Prestations
2. PACK COUP DE POUCE
3. PACK COUP DE MAIN
4. PACK COUP DE MAITRE

Ordre visuel en mode scroll <=760px:

1. Prestations
2. PACK COUP DE MAITRE
3. PACK COUP DE MAIN
4. PACK COUP DE POUCE

Important:

- Ne pas changer les prestations, prix, checks/croix ou inclusions sans demande explicite.
- Le tableau doit rester semantique.
- Les checks/croix sont des signes simples colores, avec texte accessible `Inclus` / `Non inclus`.
- Le scroll horizontal doit rester limite au tableau, pas au body.
- Le stamp doit rester visuellement attache au pack recommande.

## 8) Bug responsive `#offres` en cours / point a traiter

Dernier probleme signale par l'utilisateur:

1. Il reste un vide lateral a droite du tableau entre environ 760px et 740px.
2. Le header du tableau a trop d'espace au-dessus du texte, y compris desktop, a cause de l'espace prevu pour le stamp.

Analyse probable:

- Le vide lateral semble venir de la strategie responsive actuelle du tableau en `display:block` + lignes en `display:grid`.
- En <=760px, `.offers-table` utilise:
  - `width:max(100%, var(--offers-scroll-width))`
  - `min-width:var(--offers-scroll-width)`
  - lignes `grid-template-columns` avec `minmax(..., 1fr)`
- Entre 760px et 740px, comme le wrapper est parfois plus large que la somme minimale des colonnes, les tracks `1fr` peuvent s'etirer et/ou creer une perception d'espace en bout de tableau.
- Une solution probable est de rendre la largeur scrollable plus deterministe au breakpoint scroll:
  - utiliser une table/lignes en `width:max-content` ou une largeur calc fixe coherente avec les tracks;
  - eviter `1fr` si cela cree un espace lateral;
  - garder le scroll seulement quand le viewport est plus petit que la largeur calculee.
- Le trop grand espace header vient des overrides de fin de fichier:
  - `.offers-table thead th { padding-top:20px; }`
  - `.offers-table__recommended-head { padding-top:20px !important; }`
  - media 979 et 760 avec padding top encore important.
- Solution probable:
  - reduire les paddings top/bottom du `thead` globalement;
  - ne garder qu'un leger espace pour le stamp desktop;
  - ne pas compenser le stamp avec un gros padding interne;
  - verifier que le stamp ne chevauche pas le pack name/prix.

Avant de coder sur ce point, l'utilisateur avait demande une analyse avant implementation.

## 9) Etat des autres sections

### Header

- Desktop valide, ne pas modifier sauf demande explicite.
- Navigation mobile ajoutee et fonctionnelle.
- Liens principaux:
  - A propos
  - Methode
  - Deroule
  - Offres
  - Freins
  - Benefices
  - Contact

### `#apropos`

- Design valide.
- Portrait `profile_picture.jpg` integre.
- Desktop: photo a droite du grand titre.
- Mobile <=640px: image integree au contenu en logique editoriale, pas simple bloc sous le titre.
- Max-width des titres mobile elargi pour eviter trop de lignes.

### `#marche`

- Section reference pour coherence globale:
  - largeur container
  - style eyebrow
  - rythme vertical
  - sobriete premium

### `#blocages`

- Refondu en systeme:
  - 5 declencheurs compacts avec icones Lucide outline.
  - un seul panneau detail actif.
  - pas de numeros.
  - conclusion integree.
- Interaction hover/click.
- Le dernier hover doit rester actif, ne pas revenir automatiquement au premier.

### `#benefices`

- Split premium:
  - liste de 4 titres a gauche.
  - contenu actif a droite.
  - 3 garanties fixes en bas.
- Modele accessibilite retenu: tabs ARIA.
- Ne pas recreer un layout similaire a `#blocages`.

### `#calculateur`

- Section distincte apres `#offres`.
- Design valide.
- Champs:
  - `Prix de vente de votre bien`
  - `Cout de la vente`
  - `Ce qu'il vous reste apres la vente`
- Modes exclusifs:
  - Pourcentage 4% a 9%
  - Forfait en euros
- Resultat mis a jour en temps reel.

### Footer

- Footer complet ajoute.
- Contient:
  - SMART'IMMO / COACHING
  - phrase courte
  - navigation
  - contact
  - CTA
  - copyright
  - liens mentions legales / confidentialite

## 10) Pages legales

Fichiers:

- `mentions-legales.html`
- `politique-confidentialite.html`

Important:

- Elles ne sont pas legalement finalisees.
- Beaucoup d'informations manquantes sont volontairement affichees en rouge via `.legal-missing`.
- Ne pas supprimer ces mentions rouges tant que les informations reelles ne sont pas fournies.
- Le telephone est encore placeholder: `06.XX.XX.XX.XX` / `tel:06XXXXXXXX`.

## 11) Etat CSS

- `styles.css` est volumineux et contient plusieurs strates historiques.
- Il existe encore des anciens selecteurs `#offres` inutilises ou neutralises, notamment autour des anciennes cards/offres repliables.
- Les overrides les plus recents et importants sont en fin de fichier.
- Ne pas nettoyer agressivement si la demande porte sur un bug precis.
- Pour `#offres`, regarder en priorite:
  - bloc principal `.offers-comparison--table`, `.offers-table`, `.offers-table__flag`
  - media `@media (max-width:979px)`
  - media `@media (max-width:760px)`
  - bloc final commente `FIX #offres — stamp responsive + scroll wrapper propre`

## 12) Verifications recommandees

Commandes utiles:

- `git status --short`
- `git diff --check`
- `rg -n "selecteur|texte" fichier`
- Captures Playwright:
  - `npx playwright screenshot --full-page --viewport-size=1440,1800 file:///Users/mat/Pro/SMART-IMMO/concept-01.html /tmp/c01-1440.png`
  - `npx playwright screenshot --full-page --viewport-size=980,1800 file:///Users/mat/Pro/SMART-IMMO/concept-01.html /tmp/c01-980.png`
  - `npx playwright screenshot --full-page --viewport-size=760,1800 file:///Users/mat/Pro/SMART-IMMO/concept-01.html /tmp/c01-760.png`
  - `npx playwright screenshot --full-page --viewport-size=740,1800 file:///Users/mat/Pro/SMART-IMMO/concept-01.html /tmp/c01-740.png`
  - `npx playwright screenshot --full-page --viewport-size=390,1800 file:///Users/mat/Pro/SMART-IMMO/concept-01.html /tmp/c01-390.png`

Pour `#offres`, verifier specifiquement:

- 1440px: desktop valide, pas de changement inutile.
- 980px / 940px: tableau compact sans scroll global.
- 760px / 740px: seuil sensible, verifier vide lateral.
- 640px / 390px: scroll horizontal contenu au tableau.

Attention: les captures full-page peuvent ne pas declencher toutes les animations reveal selon le contexte. Pour diagnostiquer la geometrie, se concentrer sur layout, alignements, overflow et dimensions.

## 13) Changelog de session

Format recommande:

- `YYYY-MM-DD` - `section` - `modification` - `impact`

Dernier point connu:

- `2026-05-07` - `#offres` - Probleme restant sur responsive tableau: vide droit 760/740px + header trop haut a cause du stamp.
