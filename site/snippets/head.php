<?php
$isHome = $isHome ?? false;
$bodyClass = $bodyClass ?? 'site';

if (($title ?? null) !== null) {
    $pageTitle = $title;
} elseif ($isHome) {
    $pageTitle = $page->seoTitle()->or($page->title())->value();
} else {
    $pageTitle = $page->title()->value() . " - Smart'Immo Coaching";
}
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= esc($pageTitle) ?></title>
<?php if ($isHome): ?>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preload" as="image" href="https://images.unsplash.com/photo-1757362141189-8d2f7af341b0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2200" imagesrcset="https://images.unsplash.com/photo-1757362141189-8d2f7af341b0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600 1600w, https://images.unsplash.com/photo-1757362141189-8d2f7af341b0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2200 2200w" imagesizes="100vw" fetchpriority="high">
<?php endif ?>
  <link rel="stylesheet" href="<?= url('assets/css/style.css') ?>">
<?php if ($isHome): ?>
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js" defer></script>
  <script src="<?= url('assets/js/main.js') ?>" defer></script>
<?php endif ?>
</head>
<body class="<?= esc($bodyClass) ?>">
  <div class="page" id="top">
