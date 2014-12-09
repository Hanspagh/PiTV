'use strict';

angular.module('pitvApp')
  .service('TmdbService', function($q, bridge) {

    var _getMovie = function(imdbid) {
      var defer = $q.defer();
      bridge.emit('getMovieDetails', imdbid, function(data) {
        if (data.error) {
          defer.reject("Error Status " + data.error);
        } else {
          defer.resolve(data.result);
        }
      });
      return defer.promise;
    };

    return {
      getMovie: _getMovie
    };
  });
