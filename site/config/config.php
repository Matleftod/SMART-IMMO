<?php

return [
    'debug' => false,
    'routes' => [
        [
            'pattern' => 'sitemap.xml',
            'action'  => function () {
                $kirby = kirby();
                $base = 'https://smartimmocoaching.com';
                $pages = [
                    $kirby->site()->find('home'),
                    $kirby->site()->find('mentions-legales'),
                    $kirby->site()->find('politique-confidentialite'),
                ];

                $xml = [];
                $xml[] = '<?xml version="1.0" encoding="UTF-8"?>';
                $xml[] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

                foreach ($pages as $page) {
                    if ($page === null) {
                        continue;
                    }

                    $path = '/' . trim((string)$page->uri(), '/');
                    if ($path === '/home' || $path === '//') {
                        $path = '/';
                    }

                    $loc = rtrim($base, '/') . $path;
                    if ($path === '/') {
                        $loc = rtrim($base, '/') . '/';
                    }

                    $xml[] = '  <url><loc>' . htmlspecialchars($loc, ENT_XML1 | ENT_COMPAT, 'UTF-8') . '</loc></url>';
                }

                $xml[] = '</urlset>';

                return new Kirby\Cms\Response(implode("\n", $xml), 'application/xml');
            }
        ]
    ],
    'panel' => [
        'menu' => [
            'site',
            'help' => [
                'icon'  => 'question',
                'label' => 'Aide',
                'link'  => 'pages/aide',
            ],
            'users',
            'system',
        ],
    ],
    'cache' => [
        'pages' => [
            'active' => false,
        ],
    ],
];
