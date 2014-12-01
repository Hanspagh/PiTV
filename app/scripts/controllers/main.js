'use strict';

angular.module('pitvApp')
  .controller('MainCtrl', function($scope, $rootScope, TabbingService) {
    $scope.isActive = TabbingService.isActive;
  });
