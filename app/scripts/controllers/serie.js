'use strict';

angular.module('pitvApp')
  .controller('SerieCtrl', function ($scope, DataService, PopupService) {

    var _seasonNos = [];
    for (var season in $scope.seasons) {
      if ($scope.seasons.hasOwnProperty(season)) {
        _seasonNos.push(season);
      }
    }
    _seasonNos.sort(function (a, b) {
      return (a - b);
    });

    $scope.getSeasonNumbers = function() {
      return _seasonNos;
    };

    $scope.openSeason = function(number) {
      var scope = {
        episodes: $scope.seasons[number]
      };
      PopupService.openSeason(scope);
    };

  });
