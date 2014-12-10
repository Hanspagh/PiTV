'use strict';

angular.module('pitvApp')
  .controller('MovieCtrl', function ($scope, PlaybackService) {

    $scope.playTorrent = function(index) {
      var url = $scope.torrents[index].magnet;
      PlaybackService.start(url);
    };

  });
