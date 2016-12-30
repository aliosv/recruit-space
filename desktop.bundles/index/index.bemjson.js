({
    block : 'page',
    title : 'Recruit space - HR решения на основе машинного обучения',
    head : [
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=1024' } },
        { elem : 'css', url : '_index.css' },
        { elem : 'favicon' }
    ],
    scripts : [{ elem : 'js', url : '_index.js' }],
    mods : { theme : 'islands' },
    content : {
        block : 'sections',
        content : ['intro', 'target', 'products', 'hiw', 'contacts'].map(function(value) {
            return { block : 'section', mods : { theme : value } };
        })
    }
});
