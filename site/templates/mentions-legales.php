<?php
$siteTitle = $site->siteTitle()->or("Smart'Immo Coaching")->value();
$contactEmail = $site->contactEmail()->or('contact@smartimmocoaching.fr')->value();
$contactPhone = $site->contactPhone()->or('06.XX.XX.XX.XX')->value();
$contactPhoneDigits = preg_replace('/\D+/', '', $contactPhone);
$contactPhoneHref = (strlen($contactPhoneDigits) >= 6) ? $contactPhoneDigits : '06XXXXXXXX';
$text = static fn (string $field, string $fallback) => $page->{$field}()->or($fallback)->value();
$toHtml = static fn (string $value) => nl2br(esc($value));
$editorEmail = $text('editorEmail', '[E-mail à compléter]');
$editorPhone = $text('editorPhone', '[Téléphone à compléter]');
$editorPhoneDigits = preg_replace('/\D+/', '', $editorPhone);
$editorPhoneHref = (strlen($editorPhoneDigits) >= 6) ? $editorPhoneDigits : $contactPhoneHref;
$publicationRaw = trim($text('publicationLine', '[Nom et prénom à compléter]'));
$publicationName = preg_replace('/^Responsable de la publication\s*:\s*/iu', '', $publicationRaw) ?: '[Nom et prénom à compléter]';
?>
<?php snippet('head', ['isHome' => false, 'bodyClass' => 'site legal-page']) ?>
<?php snippet('header', ['isHome' => false]) ?>
<main class="legal-main">
  <section class="legal-hero">
    <div class="wrap">
      <p class="legal-eyebrow">Informations légales</p>
      <h1 class="serif">Mentions légales</h1>
      <p><?= $toHtml($text('heroIntro', "Informations d'identification de l'éditeur du site et cadre d'utilisation.")) ?></p>
    </div>
  </section>

  <section class="legal-content">
    <div class="wrap">
      <article class="legal-card">
        <h2 class="serif">1. Éditeur du site</h2>
        <p><?= esc($text('editorIntro', $siteTitle . ' est édité par :')) ?></p>
        <dl class="legal-list">
          <div>
            <dt>Nom commercial</dt>
            <dd><?= esc($siteTitle) ?></dd>
          </div>
          <div>
            <dt>Identité de l’éditeur</dt>
            <dd><?= esc($text('editorIdentity', '[Nom et prénom à compléter] EI')) ?></dd>
          </div>
          <div>
            <dt>Statut juridique</dt>
            <dd><?= esc($text('editorStatus', 'Entrepreneur individuel / micro-entrepreneur')) ?></dd>
          </div>
          <div>
            <dt>Adresse du siège ou domicile professionnel</dt>
            <dd><?= esc($text('editorAddress', '[Adresse professionnelle à compléter]')) ?></dd>
          </div>
          <div>
            <dt>SIREN / SIRET</dt>
            <dd><?= esc($text('editorSiret', '[SIREN / SIRET à compléter]')) ?></dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd><a href="mailto:<?= esc($editorEmail, 'attr') ?>"><?= esc($editorEmail) ?></a></dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd><a href="tel:<?= esc($editorPhoneHref, 'attr') ?>"><?= esc($editorPhone) ?></a></dd>
          </div>
          <div>
            <dt>TVA</dt>
            <dd><?= $toHtml($text('tvaLine1', 'TVA intracommunautaire : [à compléter]') . "\n" . $text('tvaLine2', 'Ou, si applicable : TVA non applicable, article 293 B du Code général des impôts.')) ?></dd>
          </div>
        </dl>
      </article>

      <article class="legal-card">
        <h2 class="serif">2. Responsable de la publication</h2>
        <p>Responsable de la publication : <?= esc($publicationName) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">3. Hébergement</h2>
        <dl class="legal-list">
          <div>
            <dt>Nom de l’hébergeur</dt>
            <dd><?= esc($text('hostName', '[Nom de l’hébergeur à compléter]')) ?></dd>
          </div>
          <div>
            <dt>Adresse de l’hébergeur</dt>
            <dd><?= esc($text('hostAddress', '[Adresse de l’hébergeur à compléter]')) ?></dd>
          </div>
          <div>
            <dt>Téléphone ou contact</dt>
            <dd><?= esc($text('hostContact', '[Téléphone ou contact de l’hébergeur à compléter]')) ?></dd>
          </div>
        </dl>
      </article>

      <article class="legal-card">
        <h2 class="serif">4. Propriété intellectuelle</h2>
        <p><?= $toHtml($text('section4Body', "Les textes, visuels, éléments graphiques, logo et contenus présents sur le site sont protégés.\n\nToute reproduction ou utilisation non autorisée est interdite, sauf accord écrit préalable.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">5. Responsabilité</h2>
        <p><?= $toHtml($text('section5Body', $siteTitle . " s'efforce de fournir des informations exactes et à jour.\n\nToutefois, le site peut contenir des erreurs ou omissions.\n\nLes informations présentées ne remplacent pas un accompagnement personnalisé.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">6. Données personnelles</h2>
        <p><?= $toHtml($text('section6Body', "Le site ne propose actuellement ni formulaire, ni espace client, ni paiement en ligne.\n\nLes données éventuellement transmises volontairement par e-mail, téléphone ou lien de contact sont utilisées uniquement pour répondre à la demande.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">7. Cookies</h2>
        <p><?= $toHtml($text('section7Body', "Le site ne dépose actuellement pas de cookies de mesure d'audience, publicitaires ou de suivi.\n\nSi cette situation évolue, cette page sera mise à jour.")) ?></p>
      </article>
    </div>
  </section>
</main>
<?php snippet('footer', ['isHome' => false, 'currentLegal' => 'mentions-legales']) ?>
  </div>
</body>
</html>
