'use strict';

angular.module('pitvApp')
  .service('YtsService', function ($http, $q) {

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
      var url = "https://yts.re/api/list.json?sort=seeds&quality=720p&set=" + page;
      var defer = $q.defer();
      $http.get(url)
        .success(function(data, status, headers, config) {
          if (status === 200) {
            if (data.error == null && data.MovieCount != null && data.MovieList != null && data.MovieList.length > 0) {
              defer.resolve(data.MovieList);
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

    return {
      getMovies: _getMovies,
      getTorrents: _getTorrents
    };
  });
