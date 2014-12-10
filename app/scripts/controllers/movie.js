'use strict';

angular.module('pitvApp')
  .controller('MovieCtrl', function ($scope, $animate, PlaybackService) {

    var container = angular.element($('.stars'));
    var rating = $scope.movie.rating / 2;
    var roundRating = Math.round(rating);
    for(var i = 5; i > 0; i--) {
      var element;
      if (i > roundRating) {
        element = angular.element('<i class="fa fa-star-o reveal"></i>');
      } else if (i == roundRating && rating % 1 >= .5) {
        element = angular.element('<i class="fa fa-star-half-o reveal"></i>');
      } else {
        element = angular.element('<i class="fa fa-star reveal"></i>');
      }
      $animate.enter(element, container);
    }

    $scope.playTorrent = function(index) {
      var url = $scope.torrents[index].magnet;
      PlaybackService.start(url);
    };

  });
