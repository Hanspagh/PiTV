'use strict';

angular.module('pitvApp')
  .service('YtsService', function ($http, $q, bridge) {

    var _getTorrents = function(imdbid) {
      var url = "https://yts.re/api/listimdb.json?imdb_id=" + imdbid;
      var defer = $q.defer();
      $http.get(url)
        .success(function(data, status, headers, config) {
          if (status === 200) {
            if (data.error == null && data.MovieCount != null && data.MovieList != null) {
              var torrents = [];
              data.MovieList.forEach(function(e) {
                torrents.push({
                  quality: e.Quality,
                  magnet: e.TorrentMagnetUrl
                });
              });
              defer.resolve(torrents);
            } else {
              defer.reject("Error: " + data.error);
            }
          } else {
            defer.reject("Error Status " + status);
          }
        })
        .error(function(data, status, headers, config) {
          defer.reject("Error Status " + status);
        });
      return defer.promise;
    };

    var _getMovies = function(page) {
      if (page < 1) page = 1;
      var defer = $q.defer();
      bridge.emit('getMovies', page, function(data) {
        if (data.error) {
          defer.reject("Error Status " + data.error);
        } else {
          if (data.result.MovieCount != null && data.result.MovieList != null && data.result.MovieList.length > 0) {
            defer.resolve(data.result.MovieList);
          } else {
            defer.reject("Error Status Faulty Data");
          }
        }
      });
      return defer.promise;
    };

    return {
      getMovies: _getMovies,
      getTorrents: _getTorrents
    };
  });
