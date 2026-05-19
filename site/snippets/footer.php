<?php
$isHome = $isHome ?? false;
$currentLegal = $currentLegal ?? null;
$homeBase = $isHome ? '' : url('/');
$topHref = $isHome ? '#top' : $homeBase . '#top';
$sectionHref = static fn (string $id) => ($isHome ? '#' : $homeBase . '#') . $id;
$siteTitle = $site->siteTitle()->or("Smart'Immo Coaching")->value();
$contactEmail = $site->contactEmail()->or('contact@smartimmocoaching.fr')->value();
$contactPhone = $site->contactPhone()->or('06.XX.XX.XX.XX')->value();
$contactPhoneDigits = preg_replace('/\D+/', '', $contactPhone);
$contactPhoneHref = (strlen($contactPhoneDigits) >= 6) ? $contactPhoneDigits : '06XXXXXXXX';
?>
<footer class="site-footer" id="site-footer">
  <div class="wrap">
    <div class="site-footer__main">
      <div class="site-footer__brand">
        <a class="site-footer__logo" href="<?= $topHref ?>" aria-label="<?= esc($siteTitle) ?> - retour en haut de page">
          <img class="site-footer__logo-image" src="<?= url('assets/images/logo.png') ?>" alt="<?= esc($siteTitle) ?>" width="320" height="120">
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
          <a href="mailto:<?= esc($contactEmail) ?>"><?= esc($contactEmail) ?></a>
          <a href="tel:<?= esc($contactPhoneHref) ?>"><?= esc($contactPhone) ?></a>
          <p>Marmande et alentours,<br>Lot-et-Garonne</p>
        </div>
        <div class="site-footer__social">
          <div class="site-footer__social-icons">
            <a class="site-footer__social-icon" href="https://www.instagram.com/smartimmocoaching/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Smart'Immo Coaching">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37a4 4 0 1 1-1.37-1.37 4 4 0 0 1 1.37 1.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a class="site-footer__social-icon" href="https://www.facebook.com/profile.php?id=61573347720485" target="_blank" rel="noopener noreferrer" aria-label="Facebook Smart'Immo Coaching">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
          <a class="site-footer__federation-link" href="https://federation-des-coachs-immobiliers.fr" target="_blank" rel="noopener noreferrer">Fédération des coachs immobiliers</a>
        </div>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>© 2026 <?= esc($siteTitle) ?></p>
      <div class="site-footer__legal">
        <a href="<?= url('mentions-legales') ?>"<?= $currentLegal === 'mentions-legales' ? ' aria-current="page"' : '' ?>>Mentions légales</a>
        <a href="<?= url('politique-confidentialite') ?>"<?= $currentLegal === 'politique-confidentialite' ? ' aria-current="page"' : '' ?>>Politique de confidentialité</a>
      </div>
    </div>
  </div>
</footer>
