'use strict';

angular.module('pitvApp')
  .controller('SeriesCtrl', function ($rootScope, $scope, DataService, PopupService) {

    $scope.items = DataService.series;

    $scope.openSerie = function(index) {
      if ($rootScope.loading)
        return;
      $rootScope.loading = true;
      var promise = DataService.loadSerie(index);
      promise.then(function(serie) {
        PopupService.openSerie(serie);
        $rootScope.loading = false;
      }, function(err) {
        console.log("Error: " + err);
        $rootScope.loading = false;
      });
    };

  });
