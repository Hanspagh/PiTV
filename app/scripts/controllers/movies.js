'use strict';

angular.module('pitvApp')
  .controller('MoviesCtrl', function ($rootScope, $scope, DataService, PopupService) {

    $scope.items = DataService.movies;

    $scope.openMovie = function(index) {
      if ($rootScope.loading)
        return;
      $rootScope.loading = true;
      var promise = DataService.loadMovie(index);
      promise.then(function(movie) {
        PopupService.openMovie(movie);
        $rootScope.loading = false;
      }, function(err) {
        console.log("Error: " + err);
        $rootScope.loading = false;
      });
    };

  });
