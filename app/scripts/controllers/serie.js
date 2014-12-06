'use strict';

angular.module('pitvApp')
  .controller('SerieCtrl', function ($scope, DataService, PopupService) {

    $scope.openSeason = function(number) {
      var scope = {
        episodes: $scope.seasons[number]
      };
      PopupService.openSeason(scope);
    };

  });
