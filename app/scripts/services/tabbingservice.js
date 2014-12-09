'use strict';

angular.module('pitvApp')
  .service('TabbingService', function(DataService) {
    var _active = '';

    var _isActive = function(name) {
      return (name === _active);
    };
    
    var _loadMoreLock = false;
    var _loadMore = function() {
      if (_loadMoreLock) return;
      _loadMoreLock = true;

      var promise;      
      switch(_active) {
        case 'series':
          promise = DataService.loadSeries();
          break;
        case 'movies':
          promise = DataService.loadMovies();
          break;
      } 

      promise.finally(function() {
        _loadMoreLock = false;
      });
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
      loadMore: _loadMore,
      active: _active
    };

  }).run(function(TabbingService) {
    // Initialise
    if (TabbingService.active == null || TabbingService.active === '') {
      TabbingService.switchTab('movies');
    }
  });
