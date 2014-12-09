'use strict';

angular.module('pitvApp')
  .controller('MainCtrl', function($scope, $rootScope, TabbingService) {
    $scope.isActive = TabbingService.isActive;
    
    var _headerHeight = 70;

    $('.container').scroll(function(e) {
      var max = $('section').height() - $('.container').height() + _headerHeight;
      if (max > 0 && $('.container').scrollTop() >= max) {
        TabbingService.loadMore();
      }
    });
  });
