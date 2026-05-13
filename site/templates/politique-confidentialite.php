<?php
$siteTitle = $site->siteTitle()->or("Smart'Immo Coaching")->value();
$contactEmail = $site->contactEmail()->or('contact@smartimmocoaching.fr')->value();
?>
<?php snippet('head', ['isHome' => false, 'bodyClass' => 'site legal-page']) ?>
<?php snippet('header', ['isHome' => false]) ?>
<main class="legal-main">
  <section class="legal-hero">
    <div class="wrap">
      <p class="legal-eyebrow">Données personnelles</p>
      <h1 class="serif">Politique de confidentialité</h1>
      <p>Cette politique explique comment <?= esc($siteTitle) ?> collecte, utilise et protège les données personnelles transmises dans le cadre d’une demande de contact ou d’un échange lié à un projet immobilier.</p>
      <p class="legal-alert">Les informations manquantes sont indiquées en rouge pour être complétées avant mise en ligne.</p>
    </div>
  </section>

  <section class="legal-content">
    <div class="wrap">
      <article class="legal-card">
        <h2 class="serif">Responsable du traitement</h2>
        <dl class="legal-list">
          <div>
            <dt>Nom commercial</dt>
            <dd><?= esc($siteTitle) ?></dd>
          </div>
          <div>
            <dt>Responsable</dt>
            <dd><span class="legal-missing">À compléter : nom et prénom de l’entrepreneur, ou dénomination sociale complète</span></dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd><span class="legal-missing">À compléter : adresse complète du responsable du traitement</span></dd>
          </div>
          <div>
            <dt>Email de contact</dt>
            <dd><a href="mailto:<?= esc($contactEmail, 'attr') ?>"><?= esc($contactEmail) ?></a></dd>
          </div>
        </dl>
      </article>

      <article class="legal-card">
        <h2 class="serif">Données collectées</h2>
        <p><?= esc($siteTitle) ?> peut collecter les données personnelles transmises volontairement par l’utilisateur lors d’une prise de contact par email, téléphone ou tout autre moyen de communication mis à disposition sur le site.</p>
        <p>Ces données peuvent notamment comprendre : nom, prénom, coordonnées, informations relatives au projet immobilier, contenu des messages échangés et toute information communiquée spontanément par l’utilisateur.</p>
        <p><span class="legal-missing">À compléter : préciser s’il existe un formulaire de contact, un outil de prise de rendez-vous, un CRM, un agenda en ligne ou tout autre service collectant des données.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Finalités du traitement</h2>
        <p>Les données personnelles sont utilisées pour répondre aux demandes de contact, échanger au sujet d’un projet immobilier, préparer ou assurer le suivi d’un accompagnement, gérer la relation client et conserver les éléments nécessaires à la gestion administrative de l’activité.</p>
        <p><span class="legal-missing">À compléter : indiquer s’il existe d’autres finalités, par exemple prospection commerciale, newsletter, statistiques, facturation, gestion comptable ou suivi après prestation.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Base légale</h2>
        <dl class="legal-list">
          <div>
            <dt>Demandes de contact</dt>
            <dd>Intérêt légitime de <?= esc($siteTitle) ?> à répondre aux demandes reçues.</dd>
          </div>
          <div>
            <dt>Préparation ou exécution d’une prestation</dt>
            <dd>Mesures précontractuelles ou exécution contractuelle lorsque l’échange concerne une prestation demandée par l’utilisateur.</dd>
          </div>
          <div>
            <dt>Obligations administratives</dt>
            <dd>Obligation légale lorsque certaines données doivent être conservées à des fins comptables, fiscales ou probatoires.</dd>
          </div>
        </dl>
        <p><span class="legal-missing">À confirmer : bases légales exactes selon les outils réellement utilisés et les traitements effectivement réalisés.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Caractère obligatoire ou facultatif</h2>
        <p>La transmission de données personnelles est facultative. Toutefois, l’absence de certaines informations peut empêcher <?= esc($siteTitle) ?> de répondre précisément à une demande ou de proposer un accompagnement adapté.</p>
        <p><span class="legal-missing">À compléter : si un formulaire existe, préciser les champs obligatoires et facultatifs.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Destinataires des données</h2>
        <p>Les données sont destinées à <?= esc($siteTitle) ?> et, lorsque cela est nécessaire, aux prestataires techniques ou administratifs intervenant pour le fonctionnement du site, la messagerie, l’hébergement, la gestion administrative ou comptable.</p>
        <p><span class="legal-missing">À compléter : lister les prestataires réellement utilisés, par exemple hébergeur, fournisseur email, outil de prise de rendez-vous, outil analytics, comptable, CRM.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Durée de conservation</h2>
        <p>Les données sont conservées pendant une durée limitée, adaptée à la finalité du traitement.</p>
        <dl class="legal-list">
          <div>
            <dt>Demandes de contact</dt>
            <dd><span class="legal-missing">À compléter : durée de conservation des demandes sans suite</span></dd>
          </div>
          <div>
            <dt>Clients et prestations</dt>
            <dd><span class="legal-missing">À compléter : durée de conservation des dossiers clients</span></dd>
          </div>
          <div>
            <dt>Facturation / comptabilité</dt>
            <dd><span class="legal-missing">À compléter : durée légale ou durée appliquée pour les documents comptables</span></dd>
          </div>
        </dl>
      </article>

      <article class="legal-card">
        <h2 class="serif">Droits des personnes</h2>
        <p>Conformément à la réglementation applicable, l’utilisateur peut demander l’accès à ses données personnelles, leur rectification, leur effacement, la limitation du traitement, ainsi que s’opposer à certains traitements lorsque la loi le permet.</p>
        <p>Pour exercer ces droits, l’utilisateur peut écrire à <a href="mailto:<?= esc($contactEmail, 'attr') ?>"><?= esc($contactEmail) ?></a>. Une réponse sera apportée dans les délais prévus par la réglementation.</p>
        <p>L’utilisateur dispose également du droit d’introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" rel="noopener">www.cnil.fr</a>.</p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Délégué à la protection des données</h2>
        <p><span class="legal-missing">À compléter : indiquer si un DPO a été désigné. Si non, indiquer “Aucun délégué à la protection des données n’a été désigné à ce jour”.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Cookies et traceurs</h2>
        <p><span class="legal-missing">À compléter : indiquer si le site utilise des cookies ou traceurs. Préciser les cookies strictement nécessaires, les cookies de mesure d’audience, les services tiers éventuels et les modalités de consentement si nécessaire.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Transfert hors Union européenne</h2>
        <p><span class="legal-missing">À compléter : indiquer si des données peuvent être transférées hors Union européenne via l’hébergement, la messagerie, des outils de statistiques, CRM, agenda ou services tiers. Si aucun transfert n’est réalisé, l’indiquer explicitement.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Sécurité des données</h2>
        <p><?= esc($siteTitle) ?> met en œuvre des mesures raisonnables pour protéger les données personnelles contre la perte, l’accès non autorisé, la divulgation, l’altération ou la destruction.</p>
        <p><span class="legal-missing">À compléter : préciser les mesures réellement en place si nécessaire, par exemple accès limité, mots de passe, messagerie sécurisée, sauvegardes, hébergement sécurisé.</span></p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Modification de la politique</h2>
        <p>La présente politique de confidentialité peut être modifiée afin de tenir compte des évolutions du site, des services proposés ou de la réglementation applicable.</p>
      </article>

      <article class="legal-card">
        <h2 class="serif">Dernière mise à jour</h2>
        <p><span class="legal-missing">À compléter : date de dernière mise à jour de la politique de confidentialité.</span></p>
      </article>
    </div>
  </section>
</main>
<?php snippet('footer', ['isHome' => false, 'currentLegal' => 'politique-confidentialite']) ?>
  </div>
</body>
</html>
