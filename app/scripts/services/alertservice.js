'use strict';

angular.module('pitvApp')
  .service('AlertService', function ($rootScope, $q, $compile, $animate) {
    var container = angular.element($('.alerts'));
    var alertScopes = [];

    var _error = function(msg) {
      var defer = _create(msg, 'views/alerts/error.html');
      return defer.promise;
    };

    var _notify = function(msg) {
      var defer = _create(msg, 'views/alerts/notify.html');
      return defer.promise;
    };

    var _create = function(message, view) {
      var defer = $q.defer();
      var scope = $rootScope.$new();
      scope.msg = message;

      var template = angular.element('<div class="alert ng-cloak reveal"></div>');
      template.append('<div ng-include="\'' + view + '\'"></div>');
      var element = $compile(template)(scope, function(element, scope) {
        $rootScope.setAlert(true);

        $animate.enter(element, container).then(function() {
          alertScopes.push(scope);
        });
      });

      scope._close = function(e) {
        var index = alertScopes.indexOf(scope);
        if (index > -1) {
          alertScopes.splice(index, 1);
        }

        var promise = $animate.leave(element);
        promise.finally(function () {
          if (alertScopes.length == 0) $rootScope.setAlert(false);
          scope.$destroy();
          defer.resolve(e);
        });
      };

      return defer;
    };

    return {
      error: _error,
      notify: _notify
    };
  });
