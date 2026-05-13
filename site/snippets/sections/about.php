<?php $siteTitle = $site->siteTitle()->or("Smart'Immo Coaching")->value(); ?>
<section id="apropos" class="about-redesign">
  <div class="wrap">
    <div class="about-redesign__header" data-reveal="fade">
      <div class="about-redesign__heading">
        <p class="about-redesign__eyebrow">À propos</p>
        <h2 class="about-redesign__title">Le coaching immobilier, une nouvelle façon de vendre son bien ?</h2>
      </div>
      <figure class="about-redesign__portrait">
        <img src="<?= url('assets/images/profile_picture.jpg') ?>" alt="Portrait du fondateur de <?= esc($siteTitle) ?>" loading="lazy" decoding="async" width="864" height="1184">
      </figure>
    </div>
    <div class="about-redesign__body">
      <div class="about-redesign__explanation">
        <figure class="about-redesign__portrait about-redesign__portrait--mobile">
          <img src="<?= url('assets/images/profile_picture.jpg') ?>" alt="Portrait du fondateur de <?= esc($siteTitle) ?>" loading="lazy" decoding="async" width="864" height="1184">
        </figure>
        <p data-reveal="slide-up">Entre les plateformes, les annonces et des acheteurs mieux informés, la vente d’un bien immobilier s’est clairement complexifiée, et beaucoup de propriétaires se retrouvent seuls face à des décisions importantes.</p>
        <p data-reveal="slide-up" data-reveal-delay="90">Il devient fréquent de vouloir vendre son bien en maîtrisant ses coûts, sans faire d’erreurs ni avancer seul.</p>
        <p data-reveal="slide-up" data-reveal-delay="180">C’est précisément dans ce contexte qu’est né le coaching immobilier : un accompagnement indépendant, concret et ancré sur le terrain, avec des échanges en direct au plus près du bien, qui permet de garder la maîtrise de sa vente, tout en s’appuyant sur une méthode et des conseils issus des pratiques professionnelles.</p>
        <p data-reveal="slide-up" data-reveal-delay="270">Entre l’autonomie totale et le recours à une agence, il s’agit d’une approche intermédiaire, qui aide à structurer sa vente, prendre du recul et avancer sans subir ni dépendre.</p>
        <p data-reveal="slide-up" data-reveal-delay="360">C’est exactement pour cela que j’ai choisi de proposer cette approche.</p>
      </div>
      <div class="about-redesign__promise">
        <p data-reveal="slide-up">Vous restez décisionnaire du début à la fin.</p>
        <p data-reveal="slide-up" data-reveal-delay="110">Je ne vends pas à votre place et je ne prends pas de mandat.</p>
        <p data-reveal="slide-up" data-reveal-delay="220">Mon rôle est de vous aider à structurer votre vente, faire les bons choix et garder le cap jusqu’au bout.</p>
      </div>
    </div>
    <div class="about-redesign__summary">
      <article class="about-redesign__summary-item" data-reveal="slide-up">
        <div class="about-redesign__summary-number">01</div>
        <strong>Remettre de la clarté dans votre vente</strong>
        <p>Vous savez où vous allez, ce qu’il faut faire, et dans quel ordre avancer pour ne pas vous perdre en route.</p>
      </article>
      <article class="about-redesign__summary-item" data-reveal="slide-up" data-reveal-delay="110">
        <div class="about-redesign__summary-number">02</div>
        <strong>Vous évitez les erreurs classiques</strong>
        <p>Des recommandations concrètes, issues de situations réelles de vente, pour vous aider à éviter les pièges les plus courants.</p>
      </article>
      <article class="about-redesign__summary-item" data-reveal="slide-up" data-reveal-delay="220">
        <div class="about-redesign__summary-number">03</div>
        <strong>Garder un lien simple et humain</strong>
        <p>Un échange direct, sans complexité inutile, pour avancer avec sérénité et garder le contrôle de votre projet.</p>
      </article>
    </div>
  </div>
</section>
