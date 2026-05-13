<?php
$isHome = $isHome ?? false;
$currentLegal = $currentLegal ?? null;
$homeBase = $isHome ? '' : url('/');
$topHref = $isHome ? '#top' : $homeBase . '#top';
$sectionHref = static fn (string $id) => ($isHome ? '#' : $homeBase . '#') . $id;
?>
<footer class="site-footer" id="site-footer">
  <div class="wrap">
    <div class="site-footer__main">
      <div class="site-footer__brand">
        <a class="site-footer__logo" href="<?= $topHref ?>" aria-label="Smart’Immo Coaching - retour en haut de page">
          <img class="site-footer__logo-image" src="<?= url('assets/images/logo.png') ?>" alt="Smart’Immo Coaching" width="320" height="120">
        </a>
        <p>Coaching immobilier indépendant pour vendre avec méthode, sans mandat ni frais d’intermédiaire.</p>
      </div>

      <nav class="site-footer__nav" aria-label="Navigation de pied de page">
        <a href="<?= $sectionHref('apropos') ?>">À propos</a>
        <a href="<?= $sectionHref('methode') ?>">Méthode</a>
        <a href="<?= $sectionHref('marche') ?>">Déroulé</a>
        <a href="<?= $sectionHref('offres') ?>">Offres</a>
        <a href="<?= $sectionHref('blocages') ?>">Freins</a>
        <a href="<?= $sectionHref('benefices') ?>">Bénéfices</a>
        <a href="<?= $sectionHref('contact') ?>">Contact</a>
      </nav>

      <div class="site-footer__contact">
        <div class="site-footer__contact-lines">
          <a href="mailto:contact@smartimmocoaching.fr">contact@smartimmocoaching.fr</a>
          <a href="tel:06XXXXXXXX">06.XX.XX.XX.XX</a>
          <p>Marmande et alentours,<br>Lot-et-Garonne</p>
        </div>
        <a class="site-footer__cta" href="<?= $sectionHref('contact') ?>">Échanger sur votre projet</a>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>© 2026 Smart’Immo Coaching</p>
      <div class="site-footer__legal">
        <a href="<?= url('mentions-legales') ?>"<?= $currentLegal === 'mentions-legales' ? ' aria-current="page"' : '' ?>>Mentions légales</a>
        <a href="<?= url('politique-confidentialite') ?>"<?= $currentLegal === 'politique-confidentialite' ? ' aria-current="page"' : '' ?>>Politique de confidentialité</a>
      </div>
    </div>
  </div>
</footer>
