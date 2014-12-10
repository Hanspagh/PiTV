'use strict';

angular.module('pitvApp')
  .controller('MoviesCtrl', function ($rootScope, $scope, DataService, PopupService, AlertService) {

    $scope.items = DataService.movies;

    $scope.openMovie = function(index) {
      if ($rootScope.loading)
        return;
      $rootScope.setLoading(true); 
      var promise = DataService.loadMovie(index);
      promise.then(function(movie) {
        PopupService.openMovie(movie);
        $rootScope.setLoading(false);
      }, function(err) {
        AlertService.error("Couldn't fetch the movie from the yts.re service. " + err.msg);
        console.log(JSON.stringify(err));
        $rootScope.setLoading(false); 
      });
    };

  });
