'use strict';

angular.module('pitvApp')
  .service('PopupService', function ($rootScope, $q, $compile, $animate) {
    var container = angular.element($('.popups'));
    var popupScopes = [];

    var _openSeason = function(scope) {
      var defer = _create(scope, 'views/popups/season.html');
      return defer.promie;
    }

    var _openMovie = function(scope) {
      var defer = _create(scope, 'views/popups/movie.html');
      return defer.promise;
    };

    var _openSerie = function(scope) {

      scope.getSeasonNumbers = function() {
        var seasonNos = [];
        for (var season in scope.seasons) {
          if (scope.seasons.hasOwnProperty(season)) {
            seasonNos.push(season);
          }
        }
        seasonNos.sort(function (a, b) {
          return (a - b);
        });
        return seasonNos;
      }

      var defer = _create(scope, 'views/popups/serie.html');
      return defer.promise;
    };
 
    var _create = function(templateScope, templateLink) {
      var defer = $q.defer();
      var scope = $rootScope.$new();

      var template = angular.element('<div class="popup ng-cloak slidein" ng-hide="inBackground"></div>');
      template.append('<div ng-include="\'views/popup-header.html\'"></div>');
      template.append('<div ng-include="\'' + templateLink + '\'" class="content"></div>');
      angular.extend(scope, templateScope);
      var element = $compile(template)(scope, function(element, scope) {
        var afterElement = null;
        if (popupScopes.length > 0) {
          afterElement = angular.element($('.popups .popup').last());
        }

        $animate.enter(element, container, afterElement).then(function() {
          $rootScope.openedPopup = true;
          $rootScope.$digest();

          popupScopes.forEach(function(s) {
            s.inBackground = true;
            s.$digest();
          });

          scope.inBackground = false;
          popupScopes.push(scope);
        });
      });

      scope._close = function(e) {
        var index = popupScopes.indexOf(scope);
        if (index > -1) {
          popupScopes.splice(index, 1);
          if (popupScopes.length == 0) {
            $rootScope.openedPopup = false;
          }
        }

        if (popupScopes.length > 0) {
          for (var i = 0; i < popupScopes.length - 1; i++) {
            popupScopes[i].inBackground = true;
          }
          popupScopes[popupScopes.length - 1].inBackground = false;
        }

        var promise = $animate.leave(element);
        promise.finally(function () {
          scope.$destroy();
          defer.resolve(e);
        });
      };

      return defer;
    };

    return {
      openMovie: _openMovie,
      openSerie: _openSerie,
      openSeason: _openSeason
    };
  });
