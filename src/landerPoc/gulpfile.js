/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
//var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

const cssDir = 'input/assets/css';

gulp.task('compileTypescript', () => {
	console.log("compileTypescript");
	var tsResult = gulp.src("Scripts/PageScripts/Phaser/*.ts")
		.pipe(sourcemaps.init())
		.pipe(ts({
			module: "amd",
			//out: "site.js"
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("Scripts/PageScripts/Phaser"));
});

// gulp.task('compileSass', () => {
// 	console.log("compile sass");
//
// 	return gulp.src(`${cssDir}/*.scss`)
// 		.pipe(sourcemaps.init())
// 		.pipe(sass().on("error", sass.logError))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(cssDir));
//
// });

gulp.task('default', () => {
	gulp.watch("Scripts/PageScripts/Phaser/*.ts", ["compileTypescript"]);
	//gulp.watch(`${cssDir}/*/*.scss`, ["compileSass"]);
});