'use strict';

angular.module('pitvApp')
  .service('EztvService', function ($http, $q, bridge) {

    var _pad = function(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }

    var _getSeries = function(page) {
      if (page < 1) page = 1;
      var defer = $q.defer();
      bridge.emit('getSeries', page, function(data) {
        if (data.error) {
          defer.reject("Error Status " + data.error);
        } else {
          defer.resolve(data.result);
        }
      });
      return defer.promise;
    };

    var _getSerie = function(imdbid) {
      var defer = $q.defer();
      bridge.emit('getSerie', imdbid, function(data) {
        if (data.error) {
          defer.reject("Error Status " + data.error);
        } else {
          var seasons = {};

          data.result.episodes.forEach(function(e) {
            if (!seasons[e.season] || seasons[e.season] == null) {
              seasons[e.season] = {};
            }

            seasons[e.season][e.episode] = {
              label: 'S' + _pad(e.season, 2) + 'E' + _pad(e.episode, 2),
              title: e.title,
              overview: e.overview,
              firstAired: e.first_aired,
              torrents: e.torrents
            };
          });

          var result = {
            extend: {
              synopsis: data.result.synopsis,
              rating: data.result.rating,
              runtime: data.result.runtime,
              status: data.result.status
            },
            seasons: seasons
          };

          defer.resolve(result);
        }
      });
      return defer.promise;
    };

    return {
      getSeries: _getSeries,
      getSerie: _getSerie
    };
  });
