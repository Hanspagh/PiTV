'use strict';

angular.module('pitvApp')
  .controller('EpisodeCtrl', function ($scope, PlaybackService) {

    $scope.playTorrent = function(index) {
      var url = $scope.torrents[index].url;
      PlaybackService.start(url);
    };

  });
