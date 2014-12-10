'use strict';

angular.module('pitvApp')
  .controller('FooterCtrl', function ($scope, PlaybackService) {

    $scope.playing = PlaybackService.playing;
    $scope.label = PlaybackService.label;

    $scope.play = function() {
      PlaybackService.play();
    };

    $scope.pause = function() {
      PlaybackService.pause();
    };

    $scope.stop = function() {
      PlaybackService.stop();
    };

    $scope.forward = function() {
      PlaybackService.forward();
    };

    $scope.backward = function() {
      PlaybackService.backward();
    };

  });
