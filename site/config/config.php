<?php

return [
    'debug' => true,
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
