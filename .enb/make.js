var levels = require('enb-bem-techs/techs/levels'),
    provide = require('enb/techs/file-provider'),
    bemdeclFromBemjson = require('enb-bem-techs/techs/bemdecl-from-bemjson'),
    deps = require('enb-bem-techs/techs/deps-old'),
    files = require('enb-bem-techs/techs/files'),
    fileCopy = require('enb/techs/file-copy'),
    bemhtml = require('enb-bemxjst/techs/bemhtml'),
    browserJs = require('enb-diverse-js/techs/browser-js'),
    ym = require('enb-modules/techs/prepend-modules'),
    css = require('enb-stylus/techs/css-stylus'),
    html = require('enb/techs/html-from-bemjson'),
    borschik = require('enb-borschik/techs/borschik'),
    autoprefixer = require('enb-autoprefixer/techs/css-autoprefixer'),
    depsByTechToBemdecl = require('enb-bem-techs/techs/deps-by-tech-to-bemdecl'),
    mergeFiles = require('enb/techs/file-merge'),

    pathSep = process.platform === 'win32'? '\\' : '/';

module.exports = function(config) {
    config.node('desktop.bundles' + pathSep + 'index', function(nodeConfig) {
        configureFiles(nodeConfig, 'bemjson');
        configureBemhtml(nodeConfig);
        configureCss(nodeConfig);
        configureJs(nodeConfig, { bemhtml : true, ym : true });
        configureHtml(nodeConfig);
    });
};

function getLevels() {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'libs/bem-components/common.blocks',
        'libs/bem-components/desktop.blocks',
        'libs/bem-components/design/common.blocks',
        'libs/bem-components/design/desktop.blocks',
        'common.blocks'
    ];
}

/**
 * Добавляет таргеты ?.files и ?.dirs в сборку.
 * @param {Object} nodeConfig
 * @param {String} provideTech
 * @returns {Array}
 */
function configureFiles(nodeConfig, provideTech) {
    nodeConfig.addTechs((provideTech === 'bemjson' ? [
        [provide, { target : '?.bemjson.js' }],
        [bemdeclFromBemjson]
    ] : [
        [provide, { target : '?.bemdecl.js' }]
    ]).concat([
        [levels, { levels : getLevels([nodeConfig._baseName]) }],
        [deps],
        [files]
    ]));
}

/**
 * Добавляет таргет ?.bemhtml в сборку. Зависит от files.
 * @param {Object} nodeConfig
 * @returns {Array}
 */
function configureBemhtml(nodeConfig) {
    nodeConfig.addTechs([[bemhtml, { devMode : false }]]);

    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([[fileCopy, { source : '?.bemhtml.js', target : '_?.bemhtml.js' }]]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([[borschik, { source : '?.bemhtml.js', target : '_?.bemhtml.js' }]]);
    });

    nodeConfig.addTargets(['_?.bemhtml.js']);
}

/**
 * Добавляет таргет ?.css в сбоку. Зависит от files.
 * @param {Object} nodeConfig
 * @returns {Array}
 */
function configureCss(nodeConfig) {
    nodeConfig.addTechs([
        [css, { target : '?.noprefix.css', filesTarget : '?.files' }],
        [autoprefixer, {
            sourceTarget : '?.noprefix.css',
            destTarget : '?.css',
            browserSupport : [
                'last 2 versions'
            ]
        }]
    ]);

    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([
            [borschik, { source : '?.css', target : '_?.css', minify : false }]
        ]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([
            [borschik, { source : '?.css', target : '_?.css', freeze : true, tech : 'cleancss' }]
        ]);
    });

    nodeConfig.addTargets(['_?.css']);
}

/**
 * Добавляет таргет ?.js в сборку. Зависит от files.
 * @param {Object} nodeConfig
 * @param {Object} params
 * @param {Boolean} params.bemhtml
 * @param {Boolean} params.ym
 * @returns {Array}
 */
function configureJs(nodeConfig, params) {
    var addBemhtml = !!(params && params.bemhtml),
        addYm = !!(params && params.ym);

    nodeConfig.addTechs([
        [browserJs, { filesTarget : '?.files' }]
    ].concat(addBemhtml ? [
            [depsByTechToBemdecl, {
                target : '?.bemhtmlFromJs.bemdecl.js',
                sourceTech : 'js',
                destTech : 'bemhtml'
            }],
            [deps, {
                bemdeclFile : '?.bemhtmlFromJs.bemdecl.js',
                target : '?.bemhtmlFromJs.deps.js'
            }],
            [files, {
                depsFile : '?.bemhtmlFromJs.deps.js',
                filesTarget : '?.bemhtmlFromJs.files',
                dirsTarget : '?.bemhtmlFromJs.dirs'
            }],
            [bemhtml, {
                target : '?.client.bemhtml.js',
                filesTarget : '?.bemhtmlFromJs.files',
                devMode : false
            }],
            [mergeFiles, {
                target : '?.js',
                sources : ['?.browser.js', '?.client.bemhtml.js']
            }]
        ] : [
            [fileCopy, { source : '?.browser.js', target : '?.js' }]
        ]).concat(addYm ? [[ym, { source : '?.js', target : '?.ym.js' }]] : []));

    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([[borschik, { source : addYm ? '?.ym.js' : '?.js', target : '_?.js', minify : false }]]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([[borschik, { source : addYm ? '?.ym.js' : '?.js', target : '_?.js', freeze : true }]]);
    });

    nodeConfig.addTargets(['_?.js']);
}

/**
 * Добавляет таргет ?.css в сбоку. Зависит от files.
 * @param {Object} nodeConfig
 * @returns {Array}
 */
function configureHtml(nodeConfig) {
    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([[html]]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([
            [html, { destTarget : '_?.html' }],
            // прежде чем фризить html нужно собрать статику, поэтому создаем обертку вокруг
            // технологии борщика, добавляем зависимость от таргетов статики
            [require('enb-borschik/node_modules/inherit')(borschik, {
                build : function() {
                    var _this = this,
                        _base = this.__base,
                        args = arguments,
                        depsTargets = ['_?.js', '_?.css'].map(function(target) {
                            return this.node.unmaskTargetName(target);
                        }, this);

                    return this.node.requireSources(depsTargets).then(function() {
                        return _base.apply(_this, args);
                    });
                }
            }), { source : '_?.html', target : '?.html', freeze : true, tech : 'html' }]
        ]);
    });

    nodeConfig.addTargets(['?.html']);
}
