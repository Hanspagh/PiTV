'use strict';

angular.module('pitvApp')
  .service('DataService', function($rootScope, $q, YtsService, TmdbService, EztvService) {

    var _movies = [];
    var _series = [];
    
    var moviesPages = 0;
    var seriesPages = 0;

    var _clearMovies = function() {
      _movies = [];
      moviesPages = 0;
    };

    var _clearSeries = function() {
      _series = [];
      seriesPages = 0;
    };

    var _loadMovieTorrents = function(imdbid) {
      return YtsService.getTorrents(imdbid);
    };

    var _loadMovies = function() {
      $rootScope.loading = true;
      var page = moviesPages++;
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

    var _loadSeries = function() {
      $rootScope.loading = true;
      var page = seriesPages++;
      var promise = EztvService.getSeries(page);
      promise.then(function(result) {
        result.forEach(function(serie) {
          _series.push({
            id: serie._id,
            imdbid: serie.imdb_id,
            title: serie.title,
            numSeasons: serie.num_seasons,
            year: serie.year,
            backdrop: serie.images.fanart,
            poster: serie.images.poster
          });
        });
        $rootScope.loading = false;
      }, function(err) {
        console.log(err);
      });
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
