/** @class map */
modules.define('map', ['i-bem__dom', 'google-map'], function(provide, BEMDOM, gmap) {
    provide(BEMDOM.decl(this.name, /** @lends map.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var map = new gmap.Map(this.domElem.get(0), {
                            zoom : 13,
                            center : {
                                lat : 55.766131,
                                lng : 37.531954
                            },
                            disableDefaultUI : true,
                            styles : [
                                {
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#f5f5f5'
                                        }
                                    ]
                                },
                                {
                                    elementType : 'labels.icon',
                                    stylers : [
                                        {
                                            visibility : 'off'
                                        }
                                    ]
                                },
                                {
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#616161'
                                        }
                                    ]
                                },
                                {
                                    elementType : 'labels.text.stroke',
                                    stylers : [
                                        {
                                            color : '#f5f5f5'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'administrative.land_parcel',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#bdbdbd'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'poi',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#eeeeee'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'poi',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#757575'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'poi.park',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#e5e5e5'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'poi.park',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#9e9e9e'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'road',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#ffffff'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'road.arterial',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#757575'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'road.highway',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#dadada'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'road.highway',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#616161'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'road.local',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#9e9e9e'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'transit.line',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#e5e5e5'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'transit.station',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#eeeeee'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'water',
                                    elementType : 'geometry',
                                    stylers : [
                                        {
                                            color : '#c9c9c9'
                                        }
                                    ]
                                },
                                {
                                    featureType : 'water',
                                    elementType : 'labels.text.fill',
                                    stylers : [
                                        {
                                            color : '#9e9e9e'
                                        }
                                    ]
                                }
                            ]
                        }),
                        marker = new gmap.Marker({
                            icon : {
                                url : 'i/marker.png',
                                size : new gmap.Size(128, 139),
                                anchor : new gmap.Point(64, 101)
                            },
                            position : {
                                lat : 55.766131,
                                lng : 37.531954
                            },
                            map : map
                        }),
                        infoWindow = new gmap.InfoWindow({
                            content : 'Recruit Space<br><br>Россия, Москва, 1-й Магистральный тупик, 5А',
                            pixelOffset : new gmap.Size(0, 101)
                        });

                    marker.addListener('click', function() {
                        infoWindow.open(map, marker);
                    });

                    infoWindow.addListener('closeclick', function() {
                        map.setCenter({
                            lat : 55.766131,
                            lng : 37.531954
                        });
                    });
                }
            }
        }
    }, /** @lends map */{}));
});
