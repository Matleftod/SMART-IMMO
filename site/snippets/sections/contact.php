<?php
$contactEmail = $site->contactEmail()->or('contact@smartimmocoaching.fr')->value();
$contactPhone = $site->contactPhone()->or('06.XX.XX.XX.XX')->value();
$contactPhoneDigits = preg_replace('/\D+/', '', $contactPhone);
$contactPhoneHref = (strlen($contactPhoneDigits) >= 6) ? $contactPhoneDigits : '06XXXXXXXX';
?>
<section id="contact" class="contact-band">
  <div class="wrap">
    <div class="section-head compact no-meta" data-reveal="fade">
      <div>
        <p class="eyebrow">Prendre contact</p>
        <h2 class="h2 serif">Et si vendre votre bien était plus simple que prévu ?</h2>
      </div>
    </div>
    <div class="contact-shell" data-reveal="fade">
      <div class="contact-grid">
        <div class="contact-copy">
          <p class="eyebrow">Prendre contact</p>
          <h3 class="serif contact-title">Un échange rapide pour faire le point sur votre projet et vos besoins.</h3>
          <div class="contact-actions">
            <a class="btn primary" href="mailto:<?= esc($contactEmail, 'attr') ?>">ENVOYER UN EMAIL</a>
            <a class="btn ghost contact-phone" href="tel:<?= esc($contactPhoneHref, 'attr') ?>">APPELER</a>
          </div>
        </div>
        <div class="contact-info">
          <div class="row"><div class="k">Téléphone</div><div class="v"><a href="tel:<?= esc($contactPhoneHref, 'attr') ?>"><?= esc($contactPhone) ?></a></div></div>
          <div class="row"><div class="k">Mail</div><div class="v"><a href="mailto:<?= esc($contactEmail, 'attr') ?>"><?= esc($contactEmail) ?></a></div></div>
          <div class="row"><div class="k">Où je me déplace</div><div class="v">Marmande et alentours<br>Lot-et-Garonne</div></div>
          <div class="row"><div class="k">Disponibilité</div><div class="v">Réponse sous 24h ouvrées<br>Du lundi au samedi</div></div>
        </div>
      </div>
    </div>
  </div>
</section>
