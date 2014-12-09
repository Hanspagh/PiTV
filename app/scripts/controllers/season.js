'use strict';

angular.module('pitvApp')
  .controller('SeasonCtrl', function ($scope, DataService, PopupService) {

    $scope.openEpisode = function(number) {
      var episode = {};
      var index = 0;
      for (var key in $scope.episodes) {
        if (index === number) {
          episode = $scope.episodes[key];
        }
        index++;
      }

      var torrents = [];
      for (var quality in episode.torrents) {
        if (quality !== "0") {
          var temp = episode.torrents[quality];
          var torrent = {
            quality: quality,
            url: temp.url,
            peers: temp.peers,
            seeds: temp.seeds
          };
          torrents.push(torrent);
        }
      }
      episode.torrents = torrents;

      PopupService.openEpisode(episode);
    };

  });
