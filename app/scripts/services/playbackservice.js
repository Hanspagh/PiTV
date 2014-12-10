'use strict';

angular.module('pitvApp')
  .service('PlaybackService', function ($q, bridge) {

    var _playing = false;

    return {
      playing: _playing
    };
  });
