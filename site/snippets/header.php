<?php
$isHome = $isHome ?? false;
$homeBase = $isHome ? '' : url('/');
$topHref = $isHome ? '#top' : $homeBase . '#top';
$sectionHref = static fn (string $id) => ($isHome ? '#' : $homeBase . '#') . $id;
?>
<header class="topbar">
  <div class="nav-shell">
    <a class="brand" href="<?= $topHref ?>">
      <img class="brand__logo" src="<?= url('assets/images/logo.png') ?>" alt="Smart’Immo Coaching" width="320" height="120">
    </a>
    <nav class="nav-links" aria-label="Navigation">
      <a href="<?= $sectionHref('apropos') ?>">À propos</a>
      <a href="<?= $sectionHref('methode') ?>">Méthode</a>
      <a href="<?= $sectionHref('marche') ?>">Déroulé</a>
      <a href="<?= $sectionHref('offres') ?>">Offres</a>
      <a href="<?= $sectionHref('blocages') ?>">Freins</a>
      <a href="<?= $sectionHref('benefices') ?>">Bénéfices</a>
      <a href="<?= $sectionHref('contact') ?>">Contact</a>
    </nav>
<?php if ($isHome): ?>
    <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation">
      <span>Menu</span>
      <i aria-hidden="true"></i>
    </button>
<?php endif ?>
    <a class="nav-cta" href="<?= $sectionHref('contact') ?>">PRENDRE CONTACT</a>
  </div>
<?php if ($isHome): ?>
  <nav class="mobile-nav" id="mobile-navigation" aria-label="Navigation mobile" hidden>
    <a href="<?= $sectionHref('apropos') ?>">À propos</a>
    <a href="<?= $sectionHref('methode') ?>">Méthode</a>
    <a href="<?= $sectionHref('marche') ?>">Déroulé</a>
    <a href="<?= $sectionHref('offres') ?>">Offres</a>
    <a href="<?= $sectionHref('blocages') ?>">Freins</a>
    <a href="<?= $sectionHref('benefices') ?>">Bénéfices</a>
    <a href="<?= $sectionHref('contact') ?>">Contact</a>
    <a class="mobile-nav__cta" href="<?= $sectionHref('contact') ?>">Prendre contact</a>
  </nav>
<?php endif ?>
</header>
