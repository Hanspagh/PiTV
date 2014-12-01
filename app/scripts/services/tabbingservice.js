'use strict';

angular.module('pitvApp')
  .service('TabbingService', function() {
    
    var tabs = [
      'series',
      'movies',
      'settings'
    ];

    var active = 'movies';

    var _isActive = function(name) {
      return (name === active);
    };

    var _switchTab = function(name) {
      tabs.forEach(function(e) {
        if (name === e) {
          active = name;
        }
      });
    };

    return {
      isActive: _isActive,
      switchTab: _switchTab
    };

  });
