'use strict';

angular.module('pitvApp')
  .service('DataService', function($rootScope, $q, YtsService, TmdbService) {

    var _movies = [];
    var _series = [];

    var _clearMovies = function() {
      _movies = [];
    };

    var _clearSeries = function() {
      _series = [];
    };

    var _loadMovieTorrents = function(imdbid) {
      return YtsService.getTorrents(imdbid);
    }

    var _loadMovies = function(page) {
      $rootScope.loading = true;
      var promise = YtsService.getMovies(page);
      promise.then(function(result) {
        var tmdbPromises = [];
        result.forEach(function(movie) {
          var tmdbPromise = TmdbService.getMovie(movie.ImdbCode);
          tmdbPromises.push(tmdbPromise);
          tmdbPromise.then(function(result) {
            _movies.push({
              id: movie.MovieID,
              imdbid: movie.ImdbCode,
              title: movie.MovieTitleClean,
              description: result.overview,
              year: movie.MovieYear,
              rating: result.vote_average,
              seeders: movie.TorrentSeeds,
              poster: result.poster_path,
              backdrop: result.backdrop_path,
              releaseDate: result.release_date,
              runtime: result.runtime
            });
          }, function(err) {
            console.log("While fetching movie " + movie.ImdbCode + ": " + err);
          });
        });
        $rootScope.loading = false;
      }, function(err) {
        console.log(err);
      });
    };

    var _loadSeries = function(page) {
      
    };
 
    return {
      clearMovies: _clearMovies,
      clearSeries: _clearSeries,
      loadMovies: _loadMovies,
      loadMovieTorrents: _loadMovieTorrents,
      loadSeries: _loadSeries,
      movies: _movies,
      series: _series
    };
  });
