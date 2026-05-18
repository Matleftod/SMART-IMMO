<?php
$isHome = $isHome ?? false;
$bodyClass = $bodyClass ?? 'site';
$siteTitle = $site->siteTitle()->or($site->title())->or("Smart'Immo Coaching")->value();
$canonicalBaseUrl = 'https://smartimmocoaching.com';

$path = '/' . trim((string)$page->uri(), '/');
if ($path === '/home' || $path === '//') {
  $path = '/';
}

$canonicalUrl = rtrim($canonicalBaseUrl, '/') . $path;
if ($path === '/') {
  $canonicalUrl = rtrim($canonicalBaseUrl, '/') . '/';
}

if (($title ?? null) !== null) {
  $pageTitle = $title;
} elseif ($isHome) {
  $pageTitle = $page->seoTitle()->or($siteTitle)->or($page->title())->value();
} else {
  $pageTitle = $page->seoTitle()->or($page->title()->value() . " - " . $siteTitle)->or($page->title())->value();
}

$metaDescription = (string)$page->metaDescription()->value();
$heroImageFile = $page->heroImage()->toFile() ?? $page->image('hero-main.jpg');
$heroImageUrl = $heroImageFile ? $heroImageFile->url() : '';
$ogImageFile = $heroImageFile ?? $site->file('logo.png') ?? $site->file('favicon.ico');
$ogImageUrl = '';
if ($ogImageFile !== null) {
  $ogImageRaw = $ogImageFile->url();
  $ogImagePath = parse_url($ogImageRaw, PHP_URL_PATH);
  if (is_string($ogImagePath) && $ogImagePath !== '') {
    $ogImageUrl = rtrim($canonicalBaseUrl, '/') . $ogImagePath;
  }
}

$ogDescription = $metaDescription !== '' ? $metaDescription : ('Informations et accompagnement proposés par ' . $siteTitle . '.');
$ogType = $isHome ? 'website' : 'article';

$contactEmail = trim((string)$site->contactEmail()->value());
$contactPhone = trim((string)$site->contactPhone()->value());
$isPlaceholderPhone = (bool)preg_match('/x|\[|à compléter|to complete/i', $contactPhone);
$isPlaceholderEmail = (bool)preg_match('/\[(.*?)\]|à compléter|to complete/i', $contactEmail);

$jsonLd = [
  '@context' => 'https://schema.org',
  '@type' => 'ProfessionalService',
  'name' => $siteTitle,
  'url' => rtrim($canonicalBaseUrl, '/') . '/',
  'description' => $ogDescription,
];

if ($ogImageUrl !== '') {
  $jsonLd['image'] = $ogImageUrl;
}
if ($contactEmail !== '' && $isPlaceholderEmail === false) {
  $jsonLd['email'] = $contactEmail;
}
if ($contactPhone !== '' && $isPlaceholderPhone === false) {
  $jsonLd['telephone'] = $contactPhone;
}

$jsonLdString = json_encode($jsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= esc($pageTitle) ?></title>
  <link rel="canonical" href="<?= esc($canonicalUrl, 'attr') ?>">
  <?php if ($metaDescription !== ''): ?>
    <meta name="description" content="<?= esc($metaDescription) ?>">
  <?php endif ?>
  <meta property="og:title" content="<?= esc($pageTitle, 'attr') ?>">
  <meta property="og:description" content="<?= esc($ogDescription, 'attr') ?>">
  <meta property="og:type" content="<?= esc($ogType, 'attr') ?>">
  <meta property="og:url" content="<?= esc($canonicalUrl, 'attr') ?>">
  <meta property="og:site_name" content="<?= esc($siteTitle, 'attr') ?>">
  <?php if ($ogImageUrl !== ''): ?>
    <meta property="og:image" content="<?= esc($ogImageUrl, 'attr') ?>">
  <?php endif ?>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= esc($pageTitle, 'attr') ?>">
  <meta name="twitter:description" content="<?= esc($ogDescription, 'attr') ?>">
  <?php if ($ogImageUrl !== ''): ?>
    <meta name="twitter:image" content="<?= esc($ogImageUrl, 'attr') ?>">
  <?php endif ?>
  <?php if ($isHome && is_string($jsonLdString)): ?>
    <script type="application/ld+json"><?= $jsonLdString ?></script>
  <?php endif ?>
  <?php if ($isHome): ?>
    <?php if ($heroImageUrl !== ''): ?>
      <link rel="preload" as="image" href="<?= esc($heroImageUrl, 'attr') ?>" fetchpriority="high">
    <?php endif ?>
  <?php endif ?>
  <link rel="icon" href="<?= url('assets/images/logo.png') ?>">
  <link rel="stylesheet" href="<?= url('assets/css/style.css') ?>">
  <?php if ($isHome): ?>
    <?php snippet('scripts', ['isHome' => true]) ?>
  <?php endif ?>
</head>

<body class="<?= esc($bodyClass) ?>">
  <div class="page" id="top">
