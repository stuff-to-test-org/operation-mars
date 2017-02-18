/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
//var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

const fallingShipTsFiles = "Scripts/PageScripts/FallingShip/*.ts";
const cssDir = 'input/assets/css';

gulp.task('compileTypescript', () => {
	console.log("compileTypescript");
	var tsResult = gulp.src(fallingShipTsFiles)
		.pipe(sourcemaps.init())
		.pipe(ts({
			module: "amd",
			out: "Scripts/PageScripts/site.js"
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("."));
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
	gulp.watch(fallingShipTsFiles, ["compileTypescript"]);
	//gulp.watch(`${cssDir}/*/*.scss`, ["compileSass"]);
});