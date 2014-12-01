'use strict';

angular.module('pitvApp')
  .controller('MainCtrl', function($scope, $rootScope, TabbingService) {
    $rootScope.loading = true;
    $scope.isActive = TabbingService.isActive;
  });
