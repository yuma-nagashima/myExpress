var gulp = require('gulp');
//var sourcemaps = require('gulp-sourcemaps');
var webpack = require('gulp-webpack');

var sass = require('gulp-sass');

gulp.task('clientBuild', function() {
    var config = require('./webpack.config.js');
    return gulp.src('./client/entry.jsx')
        .pipe(webpack(config))
        .pipe(gulp.dest('./'));
});

gulp.task('sassBuild', function() {
    return gulp.src('./client/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./server/public/css'));
});

gulp.task('default', gulp.parallel('clientBuild','sassBuild'));

gulp.task('watch', function(){
  gulp.watch('./client/scss/*.scss',  gulp.parallel('sassBuild'));
});


