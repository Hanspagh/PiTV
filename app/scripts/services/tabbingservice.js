'use strict';

angular.module('pitvApp')
  .service('TabbingService', function(DataService) {
    var _active = '';

    var _isActive = function(name) {
      return (name === _active);
    };

    var _switchTab = function(name) {
      switch(name) {
        case 'series':
          if (DataService.series.length == 0) {
            DataService.loadSeries();
          }
          _active = name;
          break;
        case 'movies':
          if (DataService.movies.length == 0) {
            DataService.loadMovies();
          }
          _active = name;
          break;
        case 'settings':
          _active = name;
          break;
      }
    };

    return {
      isActive: _isActive,
      switchTab: _switchTab,
      active: _active
    };

  }).run(function(TabbingService) {
    // Initialise
    if (TabbingService.active == null || TabbingService.active === '') {
      TabbingService.switchTab('movies');
    }
  });
