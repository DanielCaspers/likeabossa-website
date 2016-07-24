var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

const paths = {
	scripts: ['js/LikeABossa.js'],
	libScripts: [ 'bower_components/jquery/dist/jquery.min.js'
		// 'bower_components/jquery/dist/jquery.min.js',

	],
	
	styles: 'css/LikeABossa.css',
	libStyles: [ 'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/font-awesome/css/font-awesome.min.css',
		'css/fonts.css'
	],

	fonts: 'bower_components/font-awesome/fonts/font*.*',
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

function minifyCSS(src, outputFileName, outputFolder, skipMinify){
	return gulp.src(src)
 		.pipe(gulpIf( !skipMinify, cleanCSS({debug: true, advanced:false, aggressiveMerging: false}, function(file) {
			console.log(file.name + ': ' + file.stats.originalSize);
			console.log(file.name + ': ' + file.stats.minifiedSize);
		})))
		.pipe(concat(outputFileName))
		.pipe(gulp.dest(outputFolder));
}

function minifyCSSCustom(){
	return minifyCSS(paths.styles, 'likeabossa.min.css', 'dist/css', false);
}

function minifyCSSLib(){
	return minifyCSS(paths.libStyles, 'lib.min.css', 'dist/css', true);
}

// Minify and copy all homegrown JavaScript
gulp.task('minify:js:custom', ['clean'], minifyJSCustom);

gulp.task('minify:js:lib', ['clean'], minifyJSLib);

gulp.task('minify:css:custom', ['clean'], minifyCSSCustom);

gulp.task('minify:css:lib', ['clean'], minifyCSSLib);

gulp.task('minify:all', ['clean'], function(){
	runSequence(['minify:css:custom', 'minify:css:lib', 'minify:js:custom', 'minify:js:lib']);
});

//Font Awesome requires static asset font files relative to the font awesome CSS
gulp.task('copy:fonts', function(){
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('dist/fonts'));
});

//Font Awesome requires static asset font files relative to the font awesome CSS
gulp.task('copy:images', function(){
	return gulp.src(paths.images)
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copy:all', function(){
	runSequence(['copy:fonts', 'copy:images']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', function(){
	runSequence('minify:all', 'copy:all');
});