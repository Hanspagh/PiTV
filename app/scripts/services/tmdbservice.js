'use strict';

angular.module('pitvApp')
  .service('TmdbService', function($http, $q) {
    
    var _getMovie = function(imdbid) {
      var url = "https://api.themoviedb.org/3/movie/" + imdbid +
        "?api_key=c2c73ebd1e25cbc29cf61158c04ad78a";
      var defer = $q.defer();
      $http.get(url)
        .success(function(data, status, headers, config) {
          if (status === 200) {
            if (data.status_message == null && data.id != null) {
              defer.resolve(data);
            } else {
              defer.reject("Error: " + data.status_message);
            }
          } else {
            defer.reject("Error Status " + status.toString());
          }
        })
        .error(function(data, status, headers, config) {
          defer.reject("Error Status " + status);
        });
      return defer.promise;
    };

    return {
      getMovie: _getMovie
    };
  });
