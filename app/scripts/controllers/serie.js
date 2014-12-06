'use strict';

angular.module('pitvApp')
  .controller('SerieCtrl', function ($scope, DataService, PopupService) {

    $scope.getSeasonNumbers = function() {
      var seasonNos = [];
      for (var season in $scope.seasons) {
        if ($scope.seasons.hasOwnProperty(season)) {
          seasonNos.push(season);
        }
      }
      seasonNos.sort(function (a, b) {
        return (a - b);
      });
      return seasonNos;
    };

    $scope.openSeason = function(number) {
      var scope = {
        episodes: $scope.seasons[number]
      };
      PopupService.openSeason(scope);
    };

  });
