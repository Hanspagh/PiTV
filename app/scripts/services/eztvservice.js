'use strict';

angular.module('pitvApp')
  .service('EztvService', function ($http, $q, bridge) {

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

    return {
      getSeries: _getSeries
    };
  });
