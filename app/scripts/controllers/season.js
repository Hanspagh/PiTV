'use strict';

angular.module('pitvApp')
  .controller('SeasonCtrl', function ($scope, DataService, PopupService) {

    var _episodes = [];
    for (var key in $scope.episodes) {
      var temp = $scope.episodes[key];
      var episode = {
        index: key,
        title: temp.title
      };
      _episodes.push(episode);
    }
    _episodes.sort(function (a, b) {
      return (a.index - b.index);
    });

    $scope.getEpisodes = function() {
      return _episodes;
    };

    $scope.openEpisode = function(index) {
      var episode = $scope.episodes[index];
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
