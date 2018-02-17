const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();

const isDev = true;

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(sass())
    .pipe(concat('./style.min.css'))
    .pipe(cleanCss())
    .pipe(gulpIf(isDev, sourcemaps.write()))
	.pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('serv', function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
  gulp.watch(['./scss/*.scss', './scss/*/*.scss'], ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serv']);
