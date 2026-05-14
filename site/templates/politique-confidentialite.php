<?php
$siteTitle = $site->siteTitle()->or("Smart'Immo Coaching")->value();
$contactEmail = $site->contactEmail()->or('contact@smartimmocoaching.fr')->value();
$text = static fn (string $field, string $fallback) => $page->{$field}()->or($fallback)->value();
$toHtml = static fn (string $value) => nl2br(esc($value));
?>
<?php snippet('head', ['isHome' => false, 'bodyClass' => 'site legal-page']) ?>
<?php snippet('header', ['isHome' => false]) ?>
<main class="legal-main">
  <section class="legal-hero">
    <div class="wrap">
      <p class="legal-eyebrow">Données personnelles</p>
      <h1 class="serif">Politique de confidentialité</h1>
      <p><?= $toHtml($text('heroIntro', 'Traitement des données personnelles adapté au site vitrine actuel.')) ?></p>
    </div>
  </section>

  <section class="legal-content">
    <div class="wrap">
      <article class="legal-card">
        <h2 class="serif">1. Responsable du traitement</h2>
        <p><?= $toHtml($text('section1Body', "Le responsable du traitement est :\n\n[Nom et prénom à compléter] EI\n" . $siteTitle . "\nContact : [E-mail à compléter]")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">2. Données collectées</h2>
        <p><?= $toHtml($text('section2Body', "Le site ne collecte pas de données via formulaire.\n\nAucun compte utilisateur, paiement en ligne ou inscription newsletter n'est proposé.\n\nDes données peuvent être transmises volontairement si vous contactez " . $siteTitle . " par :\n- e-mail\n- téléphone\n- lien de prise de contact externe, si disponible\n\nCes données peuvent inclure : nom et prénom, coordonnées de contact, informations communiquées dans votre message.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">3. Finalités</h2>
        <p><?= $toHtml($text('section3Body', "Les données transmises sont utilisées uniquement pour :\n- répondre à une demande\n- préparer un échange ou un rendez-vous\n- assurer le suivi d'une relation commerciale si elle est engagée")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">4. Base légale</h2>
        <p><?= $toHtml($text('section4Body', "Le traitement repose sur :\n- l'exécution de mesures précontractuelles lorsque vous demandez un échange ou un devis\n- l'intérêt légitime de " . $siteTitle . " à répondre aux demandes reçues")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">5. Destinataires</h2>
        <p><?= $toHtml($text('section5Body', "Les données sont destinées uniquement à " . $siteTitle . ".\n\nElles ne sont pas vendues.\nElles ne sont pas transmises à des tiers à des fins publicitaires.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">6. Durée de conservation</h2>
        <p><?= $toHtml($text('section6Body', "Les données issues d'un échange sont conservées pendant la durée nécessaire au traitement de la demande et au suivi de la relation commerciale.\n\nEn l'absence de suite donnée, elles peuvent être supprimées à l'issue d'un délai raisonnable.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">7. Droits des personnes</h2>
        <p><?= $toHtml($text('section7Body', "Vous pouvez demander l'accès, la rectification ou la suppression de vos données.\n\nVous pouvez également vous opposer à leur traitement lorsque cela est applicable.\n\nPour exercer vos droits : [E-mail à compléter]\n\nVous pouvez également introduire une réclamation auprès de la CNIL.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">8. Cookies et traceurs</h2>
        <p><?= $toHtml($text('section8Body', "Le site ne dépose actuellement pas de cookies de mesure d'audience, publicitaires ou de suivi.\n\nAucune bannière cookies n'est donc affichée à ce stade.\n\nSi des outils de mesure d'audience ou traceurs sont ajoutés ultérieurement, la présente politique sera mise à jour.")) ?></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">9. Données techniques</h2>
        <p><?= $toHtml($text('section9Body', "L'hébergeur du site peut traiter certaines données techniques nécessaires au fonctionnement et à la sécurité du site, notamment des journaux de connexion.")) ?></p>
      </article>
    </div>
  </section>
</main>
<?php snippet('footer', ['isHome' => false, 'currentLegal' => 'politique-confidentialite']) ?>
  </div>
</body>
</html>
