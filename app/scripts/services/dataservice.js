'use strict';

angular.module('pitvApp')
  .service('DataService', function($rootScope, $resource) {

    var movies = [];
    var series = [];

    var _reloadMovies = function() {
      movies = [];
    };

    var _reloadSeries = function() {
      series = [];
    };
 
    return {
      reloadMovies: _reloadMovies,
      reloadSeries: _reloadSeries
    };
  });
