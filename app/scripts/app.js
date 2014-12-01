'use strict';

angular
  .module('pitvApp', [
    'ngAnimate',
    'ngTouch'
  ])
    .run(function(DataService) {
      DataService.loadMovies(1); 
    })
    .run(function($rootScope) {
      $rootScope.retina = window.devicePixelRatio > 1;
    });
