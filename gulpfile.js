var gulp = require('gulp');

var wiredep = require('wiredep').stream;
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var coffee = require('gulp-coffee');

var useminOptions = {
  css: [ minifyCss(), 'concat' ],
  js: [ uglify() ],
};

gulp.task('sass', function () {
  gulp.src('./app/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./app'));
});

gulp.task('usemin', function () {
  gulp.src('./app/index.html')
    .pipe(usemin(useminOptions))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function () {
  gulp.src('./app/views/**/*.html', {
    base: './app/views'
  })
    .pipe(gulp.dest('./dist/views'));

  gulp.src('./app/img/*', {
    base: './app/img'
  })
    .pipe(gulp.dest('./dist/img'));

  gulp.src('./app/font/*', {
    base: './app/font'
  })
    .pipe(gulp.dest('./dist/font'));

  gulp.src('./app/scripts/**/*.js', {
    base: './app/scripts'
  })
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('watch', function () {

  var sass = gulp.watch('./app/styles/*.scss', [ 'sass' ]);
  sass.on('change', function(event) {
    console.log('SASS File at ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  var html = gulp.watch('./app/views/**/*.html', [ 'copy' ]);
  html.on('change', function(event) {
    console.log('HTML File at ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch('./app/scripts/**/*.js', function(event) {
    console.log('Javascript File ' + event.path + ' was ' + event.type + ', recopying js-Files...');
    
    gulp.src('./app/scripts/**/*.js', {
      base: './app/scripts'
    })
      .pipe(gulp.dest('./dist/scripts'));
  });

  var coffee = gulp.watch('./server/*.coffee', [ 'coffee' ]);
  coffee.on('change', function(event) {
    console.log('Coffeescript File at ' + event.path + ' was ' + event.type + ', running tasks...');
  });

});

gulp.task('coffee', function() {
  gulp.src('./server/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('.'))
});

gulp.task('build', [
  'wiredep',
  'usemin',
  'sass',
  'copy',
  'coffee'
]);

gulp.task('default', [
  'build',
  'watch'
]);
