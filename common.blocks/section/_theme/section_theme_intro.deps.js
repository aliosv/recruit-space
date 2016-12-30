([
    {
        tech : 'js',
        mustDeps : [
            { block : 'i-bem', tech : 'bemhtml' }
        ],
        shouldDeps : [
            { block : 'modal', mods : { feedback : true }, tech : 'bemhtml' },
            { block : 'modal', tech : 'bemhtml' }
        ]
    },
    {
        shouldDeps : [
            'features',
            'header',
            'particles-js',
            { block : 'button', mods : { theme : 'custom' } },
            {
                block : 'modal',
                mods : { autoclosable : true, feedback : true, theme : 'islands' }
            }
        ]
    }
])
