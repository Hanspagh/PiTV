'use strict';

angular.module('pitvApp')
  .service('DataService', function($rootScope, $q, YtsService, TmdbService, EztvService, AlertService) {

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

    var _loadSerie = function(index) {
      var serie = _series[index];
      var promise = EztvService.getSerie(serie.imdbid);
      var defer = $q.defer();
      promise.then(function(result) {
        var scope = {
          serie: serie,
          seasons: result.seasons
        };

        for (var property in result.extend) {
          if (result.extend.hasOwnProperty(property)) {
            scope.serie[property] = result.extend[property];
          }
        }

        defer.resolve(scope);
      }, function(err) {
        defer.reject(err);
      });

      return defer.promise;
    };

    var _loadMovie = function(index) {
      var movie = _movies[index];
      var promise = YtsService.getTorrents(movie.imdbid);
      var defer = $q.defer();
      promise.then(function(result) {
        var scope = {
          movie: movie,
          torrents: result
        };
        defer.resolve(scope);
      }, function(err) {
        defer.reject(err);
      });

      return defer.promise;
    };

    var _loadMovies = function() {
      $rootScope.setLoading(true);

      var promise = YtsService.getMovies(moviesPages + 1);
      var defer = $q.defer();

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
            console.log(JSON.stringify(err));
            AlertService.error("Couldn't fetch the movie details from the Movie DB. " + err.message);
          });
        });
        $rootScope.setLoading(false);
        moviesPages++;        
        defer.resolve();
      }, function(err) {
        console.log(JSON.stringify(err));
        AlertService.error("Couldn't fetch the movies feed from yts.re. " + err.message);
        $rootScope.setLoading(false);
        defer.reject();
      });

      return defer.promise;
    };

    var _loadSeries = function() {
      $rootScope.setLoading(true);

      var promise = EztvService.getSeries(seriesPages + 1);
      var defer = $q.defer();

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
        $rootScope.setLoading(false);
        seriesPages++;        
        defer.resolve();
      }, function(err) {
        console.log(JSON.stringify(err));
        AlertService.error("Couldn't fetch the series feed from popcorntime.io. " + err.message);
        $rootScope.setLoading(false);
        defer.resolve();
      });

      return defer.promise;
    };
 
    return {
      clearMovies: _clearMovies,
      clearSeries: _clearSeries,
      loadMovies: _loadMovies,
      loadMovie: _loadMovie,
      loadSeries: _loadSeries,
      loadSerie: _loadSerie,
      movies: _movies,
      series: _series
    };
  });
