<?php
$heroImageFile = $page->heroImage()->toFile() ?? $page->image('hero-main.jpg');
$heroImageUrl = $heroImageFile ? $heroImageFile->url() : '';
?>
  <section id="accueil" class="hero-10">
    <div class="media" aria-hidden="true" style="--hero-bg-image:url('<?= esc($heroImageUrl, 'attr') ?>');"></div>
    <div class="content">
      <div class="intro" data-reveal="fade">
        <p class="eyebrow">Accompagnement immobilier</p>
        <h1 class="h1 serif"><span class="hero-title-line">Vendez librement,</span><span class="hero-title-line">mais jamais seul.</span></h1>
        <p class="lead">Un accompagnement indépendant pour vendre votre bien par vous-même, avec méthode, clarté et sérénité. Sans mandat, sans frais d’intermédiaire, vous gardez le contrôle et optimisez votre vente.</p>
        <div class="actions">
          <a class="btn primary" href="#offres">Voir les offres</a>
          <a class="btn ghost" href="#contact">Prendre contact</a>
        </div>
      </div>
      <aside class="blur-note" data-reveal="slide-right">
        <p class="note-title serif">Vendre sereinement, ça se prépare.</p>
        <p>Je vous accompagne pour structurer votre vente entre particuliers, prendre les bonnes décisions au bon moment, et garder le cap jusqu’au bout.</p>
        <div class="line"></div>
        <p>Vous savez où vous mettez les pieds, et comment avancer.</p>
      </aside>
    </div>
  </section>
