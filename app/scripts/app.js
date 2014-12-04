'use strict';

angular
  .module('pitvApp', [
    'ngAnimate',
    'ngTouch',
    'btford.socket-io'
  ])
    .run(function($rootScope) {
      $rootScope.retina = window.devicePixelRatio > 1;
    });
