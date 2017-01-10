/** @class sections */
modules.define('sections', ['i-bem__dom', 'fullpage-js'], function(provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, /** @lends sections.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var slidesNumber = this.findBlocksInside('section').length,
                        themes = {
                            1 : 'dark',
                            2 : 'dark',
                            3 : 'light',
                            4 : 'dark',
                            5 : 'light'
                        };

                    this.domElem.fullpage({
                        navigation : true,
                        anchors : (new Array(slidesNumber + 1)).join(' ').split(' ').map(function(v, i) {
                            return String(i + 1);
                        }),

                        afterLoad : function(link, index) {
                            // update navigation when page loads on first slide
                            $('#fp-nav').addClass(themes[index]);
                        },

                        onLeave : function(index, nextIndex) {
                            $('#fp-nav')
                                .removeClass(themes[index])
                                .addClass(themes[nextIndex]);
                        }
                    });

                    this.bindTo('next', 'click', function() {
                        $.fn.fullpage.moveSectionDown();
                    });
                }
            }
        }
    }, /** @lends sections */{}));
});
