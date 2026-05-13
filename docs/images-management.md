# Gestion des images (Smart'Immo Coaching)

## Objectif
Toutes les images de rendu de la home sont désormais locales (plus d'URL image distante dans le front).

## Stockage
- Images éditables de la home: `content/home/`
- Fichiers actuellement utilisés:
  - `hero-main.jpg`
  - `method-step-1.jpg`
  - `method-step-2.jpg`
  - `method-step-3.jpg`
  - `benefit-1.jpg`
  - `benefit-2.jpg`
  - `benefit-3.jpg`
  - `benefit-4.jpg`

## Champs Panel (Home)
Dans `site/blueprints/pages/home.yml`:
- `heroImage`
- `methodImage1`
- `methodImage2`
- `methodImage3`
- `benefitImage1`
- `benefitImage2`
- `benefitImage3`
- `benefitImage4`

Chaque champ pointe vers `page.images` avec `max: 1`.

Correspondance des champs:
- `heroImage`: image principale du hero.
- `methodImage1`, `methodImage2`, `methodImage3`: visuels des 3 étapes de la section Méthode.
- `benefitImage1`, `benefitImage2`, `benefitImage3`, `benefitImage4`: visuels de la section Bénéfices (états du sélecteur).

## Fallbacks
Chaque section lit d'abord le champ Kirby, puis fallback sur le fichier local de `content/home`:
- Hero: `hero-main.jpg`
- Méthode: `method-step-1/2/3.jpg`
- Bénéfices: `benefit-1/2/3/4.jpg`

Si un champ est vide, le rendu reste stable via ce fallback local.

## Convention d'URL publique
- Toujours utiliser des objets fichiers Kirby (`toFile()` / `image()`) puis `$file->url()`.
- Ne pas référencer directement `/content/home/*.jpg` dans les snippets, templates ou CSS.
- Les champs Panel stockent des noms de fichiers, pas des URLs.
- Les images décoratives non éditables peuvent rester dans `assets/images/`.

## Gestion des images dans le Panel
1. Aller sur `/panel` puis ouvrir la page **Accueil**.
2. Vérifier la section **Images disponibles** (cartes): upload, remplacement et édition de métadonnées.
3. Dans les groupes de champs (Hero, Méthode, Bénéfices), sélectionner l'image à utiliser pour chaque emplacement.
4. Ouvrir l'image choisie et renseigner le champ **Texte alternatif**.

Notes:
- Ne pas coller d'URL externe dans le contenu.
- Ne pas saisir de chemin `/content/home/...` dans les champs.
- Les images rendues en `<img>` utilisent l'alt du fichier si renseigné (fallback texte conservé).
- Les images utilisées en background ou `data-*` n'exposent pas d'alt directement.

## Remplacement d'une image
1. Ouvrir `/panel` > page **Accueil**.
2. Uploader l'image dans **Images disponibles** (si elle n'existe pas encore).
3. Dans le champ cible (`heroImage`, `methodImage*`, `benefitImage*`), sélectionner l'image.
4. Renseigner le **Texte alternatif** du fichier.
5. Vérifier le rendu front (desktop + mobile), puis les interactions de la section concernée.

## Règles
- Ne pas remettre d'URL d'image distante dans snippets/CSS/JS.
- Conserver les ratios/cadrages visuels actuels.
- Vérifier les pages publiques et les interactions après changement d'image.
