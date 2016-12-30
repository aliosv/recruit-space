/* globals google */

modules.define('google-map', ['loader_type_js'], function(provide, loader) {
    loader('https://maps.googleapis.com/maps/api/js?key=AIzaSyAU031p7crf4LR909Q2X7wZM8E8kV1yaZc', function() {
        provide(google.maps);
    });
});
