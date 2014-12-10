'use strict';

angular.module('pitvApp')
  .service('PlaybackService', function ($q, bridge) {

    var _playing = false;
    var _label = "";

    var _play = function() {
      var defer = $q.defer();
      bridge.emit('playbackPlay', function(success) {
        if (success) {
          _playing = true;
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    var _pause = function() {
      var defer = $q.defer();
      bridge.emit('playbackPause', function(success) {
        if (success) {
          _playing = false;
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    var _stop = function() {
      var defer = $q.defer();
      bridge.emit('playbackStop', function(success) {
        if (success) {
          _playing = false;
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
   };

    var _start = function(url) {
      var defer = $q.defer();
      bridge.emit('playbackStart', url, function(success) {
        if (success) {
          _playing = true;
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    var _forward = function() {
      var defer = $q.defer();
      bridge.emit('playbackForward', function(success) {
        if (success) {
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    var _backward = function() {
      var defer = $q.defer();
      bridge.emit('playbackBackward', function(success) {
        if (success) {
          defer.resolve();
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    return {
      playing: _playing,
      play: _play,
      pause: _pause,
      stop: _stop,
      start: _start,
      forward: _forward,
      backward: _backward,
      label: _label
    };
  });
