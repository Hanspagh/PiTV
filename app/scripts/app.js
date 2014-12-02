'use strict';

angular
  .module('pitvApp', [
    'ngAnimate',
    'ngTouch'
  ])
    .run(function($rootScope) {
      $rootScope.retina = window.devicePixelRatio > 1;
    });
