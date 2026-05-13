<?php
$benefitImage1File = $page->benefitImage1()->toFile() ?? $page->image('benefit-1.jpg');
$benefitImage2File = $page->benefitImage2()->toFile() ?? $page->image('benefit-2.jpg');
$benefitImage3File = $page->benefitImage3()->toFile() ?? $page->image('benefit-3.jpg');
$benefitImage4File = $page->benefitImage4()->toFile() ?? $page->image('benefit-4.jpg');
$benefitImage1Url = $benefitImage1File ? $benefitImage1File->url() : '';
$benefitImage2Url = $benefitImage2File ? $benefitImage2File->url() : '';
$benefitImage3Url = $benefitImage3File ? $benefitImage3File->url() : '';
$benefitImage4Url = $benefitImage4File ? $benefitImage4File->url() : '';
?>
<section id="benefices" class="assurance-merge" style="--benefit-visual-image:url('<?= esc($benefitImage1Url, 'attr') ?>');">
  <div class="wrap">
    <div class="benefices-showcase" data-benefit-chooser data-reveal="fade">
      <div class="benefices-title-block">
        <p class="eyebrow">Reprenez le contrôle.</p>
        <h2 class="h2 serif">Reprenez le contrôle.</h2>
      </div>
      <div class="benefices-split">
        <div class="benefit-selectors" role="tablist" aria-label="Choisir un bénéfice" aria-orientation="vertical">
          <button class="benefit-choice is-active" id="benefit-choice-1" type="button" role="tab" aria-selected="true" aria-controls="benefices-active" tabindex="0" data-benefit-choice data-benefit-title="1. Comprendre la vraie valeur de votre bien" data-benefit-copy="Un bien, c’est souvent une histoire… mais sur le marché, ce sont les bons repères qui comptent." data-benefit-image="<?= esc($benefitImage1Url, 'attr') ?>" data-benefit-image-position="84% 58%">
            <span class="benefit-choice__title">1. Comprendre la vraie valeur de votre bien</span>
          </button>
          <button class="benefit-choice" id="benefit-choice-2" type="button" role="tab" aria-selected="false" aria-controls="benefices-active" tabindex="-1" data-benefit-choice data-benefit-title="2. Créer l’envie dès le premier regard" data-benefit-copy="Annonce, photos, vidéo, présentation : tout est pensé pour déclencher de vraies visites, pas du hasard." data-benefit-image="<?= esc($benefitImage2Url, 'attr') ?>" data-benefit-image-position="72% 52%">
            <span class="benefit-choice__title">2. Créer l’envie dès le premier regard</span>
          </button>
          <button class="benefit-choice" id="benefit-choice-3" type="button" role="tab" aria-selected="false" aria-controls="benefices-active" tabindex="-1" data-benefit-choice data-benefit-title="3. Ne garder que les bonnes visites" data-benefit-copy="Ce qui n’est pas sérieux ne passe pas la porte. Ce qui l’est, reste et avance." data-benefit-image="<?= esc($benefitImage3Url, 'attr') ?>" data-benefit-image-position="74% 48%">
            <span class="benefit-choice__title">3. Ne garder que les bonnes visites</span>
          </button>
          <button class="benefit-choice" id="benefit-choice-4" type="button" role="tab" aria-selected="false" aria-controls="benefices-active" tabindex="-1" data-benefit-choice data-benefit-title="4. Accompagner jusqu’à la concrétisation" data-benefit-copy="Une vente réussie, c’est bien souvent une suite de décisions simples, prises au bon moment." data-benefit-image="<?= esc($benefitImage4Url, 'attr') ?>" data-benefit-image-position="82% 58%">
            <span class="benefit-choice__title">4. Accompagner jusqu’à la concrétisation</span>
          </button>
        </div>
        <article class="benefit-active" id="benefices-active" role="tabpanel" aria-labelledby="benefit-choice-1" aria-live="polite">
          <h3 class="serif" data-benefit-title>1. Comprendre la vraie valeur de votre bien</h3>
          <p data-benefit-copy>Un bien, c’est souvent une histoire… mais sur le marché, ce sont les bons repères qui comptent.</p>
        </article>
      </div>
      <div class="manifesto" aria-label="Garanties">
        <article class="row">
          <h4 class="serif">Un forfait clair, pas de surprise au résultat</h4>
          <p class="muted">Vous payez pour un accompagnement défini dès le départ, sans commission ni pourcentage sur le prix de vente. Simple, transparent, lisible.</p>
        </article>
        <article class="row">
          <h4 class="serif">Ensemble vers une vente fluide et réussie</h4>
          <p class="muted">Parce que personne ne connaît votre bien comme vous, on construit une stratégie à deux : votre vision + mon expertise.</p>
        </article>
        <article class="row">
          <h4 class="serif">Du temps gagné, de l’énergie économisée</h4>
          <p class="muted">On évite les erreurs, les hésitations et les démarches inutiles : tout est simplifié pour avancer vite, bien et sans stress.</p>
        </article>
      </div>
    </div>
  </div>
</section>
