var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
 
var paths = {
  scripts: ['js/*.js', '!js/*.min.js'],
	libScripts: ['js/*.js', '!js/*.min.js',
		'bower_components/jquery/dist/jquery.min.js' 
	],
	
	styles: 'css/LikeABossa.css',
	fonts: 'css/fonts.css',
	libStyles: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 
		'bower_components/font-awesome/css/font-awesome.min.css'
	],
  images: 'img/**/*'
};
 
gulp.task('clean', function() {
  return del(['dist']);
});
 
gulp.task('minify:js:custom', ['clean'], function() {
  // Minify and copy all homegrown JavaScript
  return gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(concat('likeabossa.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify:js:lib', ['clean'], function() {
  // Minify and copy all vendor JavaScript
  return gulp.src(paths.libScripts)
      .pipe(uglify())
      .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify:css:custom', ['clean'], function() {
  // Minify and copy all homegrown styles
  return gulp.src(paths.styles)
      .pipe(cleanCSS({debug: true}, function(file) {
				console.log(file.name + ': ' + file.stats.originalSize);
				console.log(file.name + ': ' + file.stats.minifiedSize);
			}))
      .pipe(concat('likeabossa.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify:css:lib', ['clean'], function() {
  // Minify and copy all vendor styles
  return gulp.src(paths.libStyles)
      .pipe(cleanCSS({debug: true}, function(file) {
				console.log(file.name + ': ' + file.stats.originalSize);
				console.log(file.name + ': ' + file.stats.minifiedSize);
			}))
			.pipe(addsrc(paths.fonts))
      .pipe(concat('lib.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify:all', ['clean'], function(){
	runSequence(['minify:css:custom', 'minify:css:lib', 'minify:js:custom', 'minify:js:lib']);
})
 
// Copy all static images 
/* gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
}); */
 
/* // Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
}); */
 
//// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean', 'minify:all']);