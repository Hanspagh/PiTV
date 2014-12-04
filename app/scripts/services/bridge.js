'use strict';

angular.module('pitvApp')
  .factory('bridge', function(socketFactory) {
    var socket = socketFactory({
      prefix: 'socket:',
      ioSocket: io.connect('/remote')
    });

    // socket.forward('error');

    return socket;
  });
