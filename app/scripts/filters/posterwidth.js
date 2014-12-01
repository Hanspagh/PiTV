'use strict';

angular.module('pitvApp')
  .filter('posterWidth', function () {
    return function (input) {
      return (input ? 'http://image.tmdb.org/t/p/w500' : 'http://image.tmdb.org/t/p/w300');
    };
});
