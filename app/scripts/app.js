'use strict';

angular
  .module('pitvApp', [
    'ngAnimate',
    'ngTouch',
    'btford.socket-io'
  ])
    .run(function($rootScope, $timeout) {
      $rootScope.retina = window.devicePixelRatio > 1;

      $rootScope.setLoading = function(input) {
        $timeout(function() {
          $rootScope.loading = input;
        }, 0);
      };

      $rootScope.setAlert = function(input) {
        $timeout(function() {
          $rootScope.alert = input;
        }, 0);
      };
    });
