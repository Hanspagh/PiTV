'use strict';

angular.module('pitvApp')
  .controller('MoviesCtrl', function ($rootScope, $scope, DataService, PopupService) {

    $scope.items = DataService.movies;

    $scope.openMovie = function(movie) {
      $rootScope.loading = true;
      var promise = DataService.loadMovieTorrents(movie.imdbid);
      promise.then(function(result) {
        var scope = {
          movie: movie,
          torrents: result
        };
        PopupService.openMovie(scope);
        $rootScope.loading = false;
      }, function(err) {
        console.log("Error: " + err);
      });
    };

  });
