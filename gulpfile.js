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

function minifyJS(src, outputFileName, outputFolder){
	return gulp.src(src)
		.pipe(uglify())
		.pipe(concat(outputFileName))
		.pipe(gulp.dest(outputFolder));
}

function minifyJSCustom(){
	return minifyJS(paths.scripts, 'likeabossa.min.js', 'dist/js');
}

function minifyJSLib(){
	return minifyJS(paths.libScripts, 'lib.min.js', 'dist/js');
}

function minifyCSS(src, outputFileName){
	return gulp.src(src)
		.pipe(cleanCSS({debug: true}, function(file) {
			console.log(file.name + ': ' + file.stats.originalSize);
			console.log(file.name + ': ' + file.stats.minifiedSize);
		}))
		.pipe(concat(outputFileName))
		.pipe(gulp.dest('dist/css'));
}

function minifyCSSCustom(){
	return minifyCSS(paths.styles, 'likeabossa.min.css', 'dist/css');
}

function minifyCSSLib(){
	return minifyCSS(paths.libStyles, 'lib.min.css', 'dist/css');
}

// Minify and copy all homegrown JavaScript
gulp.task('minify:js:custom', ['clean'], minifyJSCustom);

gulp.task('minify:js:lib', ['clean'], minifyJSLib);

gulp.task('minify:css:custom', ['clean'], minifyCSSCustom);

gulp.task('minify:css:lib', ['clean'], minifyCSSLib);

gulp.task('minify:all', ['clean'], function(){
	runSequence(['minify:css:custom', 'minify:css:lib', 'minify:js:custom', 'minify:js:lib']);
})
  
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean', 'minify:all']);