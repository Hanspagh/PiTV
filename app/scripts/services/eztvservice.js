'use strict';

angular.module('pitvApp')
  .service('EztvService', function ($http, $q) {
    
    var _getSeries = function(page) {
      if (page < 1) page = 1;
      var url = "http://api.popcorntime.io/shows/" + page;
      var defer = $q.defer();
      $http.get(url)
        .success(function(data, status, headers, config) {
          if (status === 200 && data != null) {
            defer.resolve(data);
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
      getSeries: _getSeries
    };
  });
