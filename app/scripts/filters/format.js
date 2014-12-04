'use strict';

angular.module('pitvApp')
  .filter('removeYear', function () {
    return function (input) {
      var re = re = /\s\(\d{4}\)/gi;
      return input.replace(re, '');
    };
});
