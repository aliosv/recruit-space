/** @class feedback */
modules.define('feedback', ['i-bem__dom', 'BEMHTML', 'jquery'], function(provide, BEMDOM, BEMHTML, $) {
    provide(BEMDOM.decl(this.name, /** @lends feedback.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var $promise,
                        $form = this.elem('form');

                    this.bindTo('form', 'submit', function(e) {
                        var formData = new FormData($form.get(0));

                        e.preventDefault();

                        if($promise) return $promise;

                        $promise = $.ajax({
                            url : '/contact-form',
                            type : 'POST',
                            data : formData,
                            processData : false
                        });

                        $promise.then(function() {
                            BEMDOM.replace($form, BEMHTML.apply({
                                block : 'feedback',
                                elem : 'message',
                                elemMods : { success : true },
                                content : 'Ваша заявка прнията, мы с вами свяжемся'
                            }));
                        }, function() {
                            BEMDOM.replace($form, BEMHTML.apply({
                                block : 'feedback',
                                elem : 'message',
                                elemMods : { error : true },
                                content : 'Что-то пошло не так, попробуйте повторить позже...'
                            }));
                        });
                    });
                }
            }
        }
    }, /** @lends feedback */{}));
});
