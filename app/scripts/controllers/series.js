'use strict';

angular.module('pitvApp')
  .controller('SeriesCtrl', function ($scope, DataService) {

    $scope.items = DataService.series;

  });
