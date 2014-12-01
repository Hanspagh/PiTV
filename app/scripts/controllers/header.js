'use strict';

angular.module('pitvApp')
  .controller('HeaderCtrl', function($scope, TabbingService) {

    $scope.menu = false;

    $scope.toggleMenu = function() {
      if ($scope.menu) {
        $scope.menu = false;
      } else {
        $scope.menu = true;
      }
    };

    $scope.switchTab = function(name) {
      TabbingService.switchTab(name);
      $scope.menu = false;
    };

  });
