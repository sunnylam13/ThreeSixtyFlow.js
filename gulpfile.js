// this is a little Node program, running on a Node server
// require() will look inside of a folder and get information, similar to import

// NOTE:  gulpfile.js must be in the main directory

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');

////////////////////////////////////////////
// 		JADE COMPILE
////////////////////////////////////////////

gulp.task('jade', function() {
  var jade_locals = {};
 
  return gulp.src('./*.jade')
    .pipe(jade({
      locals: jade_locals,
      pretty: true
    }))
    .pipe(gulp.dest('./'))
});

////////////////////////////////////////////
// 		END JADE COMPILE
////////////////////////////////////////////


////////////////////////////////////////////
// 		SASS COMPILE
////////////////////////////////////////////

gulp.task('sass', function () {
	return gulp.src('css/*.scss')
				.pipe(plumber())
				.pipe(sass({
					'sourcemap=none':true,
					'errLogToConsole':true
				}))
				.pipe(concat('style.css'))
				.pipe(autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
		        }))
		        // .pipe(minifyCss({compatibility: 'ie8'}))
				.pipe(gulp.dest('css/'))
				.pipe(browserSync.stream());

});

////////////////////////////////////////////
// 		END SASS COMPILE
////////////////////////////////////////////





////////////////////////////////////////////
// 		BROWSER SYNC
////////////////////////////////////////////

// Thursday, May 21, 2015 5:46 PM:  not operational

gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "./",
    });

    gulp.watch("css/*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);

});

////////////////////////////////////////////
// 		END BROWSER SYNC
////////////////////////////////////////////



////////////////////////////////////////////
// 		DEFAULT
////////////////////////////////////////////

gulp.task('default', ['server'], function () {	
	gulp.watch('css/*.scss', ['sass']);
	gulp.watch('./*.jade',['jade']);
	// gulp.watch('./',['server']);
	// gulp.watch("*.html").on('change', reload);
});

////////////////////////////////////////////
// 		END DEFAULT
////////////////////////////////////////////


