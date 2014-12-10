'use strict';

angular.module('pitvApp')
  .controller('FooterCtrl', function ($scope, PlaybackService) {

    $scope.playing = PlaybackService.playing;

  });
