'use strict';

angular.module('pitvApp')
  .controller('SeriesCtrl', function ($rootScope, $scope, DataService, PopupService, AlertService) {

    $scope.items = DataService.series;

    $scope.openSerie = function(index) {
      if ($rootScope.loading)
        return;
      $rootScope.setLoading(true);
      var promise = DataService.loadSerie(index);
      promise.then(function(serie) {
        PopupService.openSerie(serie);
        $rootScope.setLoading(false); 
      }, function(err) {
        AlertService.error("Couldn't fetch the serie from the popcorntime.io service. " + err.msg);
        console.log(JSON.stringify(err));
        $rootScope.setLoading(false); 
      });
    };

  });
