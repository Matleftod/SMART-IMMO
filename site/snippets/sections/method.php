<?php
$methodImage1File = $page->methodImage1()->toFile() ?? $page->image('method-step-1.jpg');
$methodImage2File = $page->methodImage2()->toFile() ?? $page->image('method-step-2.jpg');
$methodImage3File = $page->methodImage3()->toFile() ?? $page->image('method-step-3.jpg');
$methodImage1Url = $methodImage1File ? $methodImage1File->url() : '';
$methodImage2Url = $methodImage2File ? $methodImage2File->url() : '';
$methodImage3Url = $methodImage3File ? $methodImage3File->url() : '';
$methodImage1Alt = $methodImage1File ? $methodImage1File->alt()->or('Visuel de préparation')->value() : 'Visuel de préparation';
$methodImage2Alt = $methodImage2File ? $methodImage2File->alt()->or('Visuel de suivi')->value() : 'Visuel de suivi';
$methodImage3Alt = $methodImage3File ? $methodImage3File->alt()->or('Visuel de sécurisation')->value() : 'Visuel de sécurisation';
?>
<section id="methode" class="method-full">
  <div class="wrap">
    <div class="section-head no-meta" data-reveal="fade">
      <div>
        <p class="eyebrow">Méthode</p>
        <h2 class="h2 serif">Une vente, ça se construit étape par étape.</h2>
      </div>
    </div>
    <div class="triptych">
      <article class="phase" data-reveal="slide-up">
        <img src="<?= esc($methodImage1Url, 'attr') ?>" srcset="<?= esc($methodImage1Url, 'attr') ?> 640w, <?= esc($methodImage1Url, 'attr') ?> 900w, <?= esc($methodImage1Url, 'attr') ?> 1200w" sizes="(max-width: 640px) calc(100vw - 104px), (max-width: 820px) calc(100vw - 128px), 380px" alt="<?= esc($methodImage1Alt, 'attr') ?>" loading="lazy" decoding="async" fetchpriority="low" width="1200" height="800">
        <div class="body">
          <div class="tag"><i></i><span>Avant</span></div>
          <h3 class="serif">Tout commence ici</h3>
          <p class="phase-copy">C’est à ce moment que se définissent les bases du projet : la compréhension du bien, sa position sur le marché et les éléments qui vont structurer toute la suite de la vente. Une préparation solide permet d’aborder le marché avec cohérence et de limiter les incertitudes.</p>
        </div>
      </article>
      <article class="phase" data-reveal="slide-up" data-reveal-delay="500">
        <img src="<?= esc($methodImage2Url, 'attr') ?>" srcset="<?= esc($methodImage2Url, 'attr') ?> 640w, <?= esc($methodImage2Url, 'attr') ?> 900w, <?= esc($methodImage2Url, 'attr') ?> 1200w" sizes="(max-width: 640px) calc(100vw - 104px), (max-width: 820px) calc(100vw - 128px), 380px" alt="<?= esc($methodImage2Alt, 'attr') ?>" loading="lazy" decoding="async" fetchpriority="low" width="1200" height="800">
        <div class="body">
          <div class="tag"><i></i><span>Pendant</span></div>
          <h3 class="serif">Le marché s’exprime</h3>
          <p class="phase-copy">Les retours des acheteurs, les visites et les signaux du marché permettent de mesurer l’intérêt réel et d’ajuster la compréhension de la situation. Cette étape demande de la lecture et de l’analyse pour garder une trajectoire stable.</p>
        </div>
      </article>
      <article class="phase" data-reveal="slide-up" data-reveal-delay="1000">
        <img src="<?= esc($methodImage3Url, 'attr') ?>" srcset="<?= esc($methodImage3Url, 'attr') ?> 640w, <?= esc($methodImage3Url, 'attr') ?> 900w, <?= esc($methodImage3Url, 'attr') ?> 1200w" sizes="(max-width: 640px) calc(100vw - 104px), (max-width: 820px) calc(100vw - 128px), 380px" alt="<?= esc($methodImage3Alt, 'attr') ?>" loading="lazy" decoding="async" fetchpriority="low" width="1200" height="800">
        <div class="body">
          <div class="tag"><i></i><span>Après</span></div>
          <h3 class="serif">La phase de décision</h3>
          <p class="phase-copy">C’est le moment où les propositions sont étudiées et où les décisions finales sont prises jusqu’à la signature. Cette étape demande de la clarté et une vision globale pour avancer sereinement vers la conclusion.</p>
        </div>
      </article>
    </div>
  </div>
</section>
