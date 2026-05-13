<?php
$isHome = $isHome ?? false;
$bodyClass = $bodyClass ?? 'site';
$siteTitle = $site->siteTitle()->or($site->title())->or("Smart'Immo Coaching")->value();

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
?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= esc($pageTitle) ?></title>
  <?php if ($metaDescription !== ''): ?>
    <meta name="description" content="<?= esc($metaDescription) ?>">
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
