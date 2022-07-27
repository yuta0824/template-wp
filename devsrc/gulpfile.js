const gulp = require("gulp");

/* sass */
// const sass = require("gulp-sass");
// const plumber = require("gulp-plumber");
// const notify = require("gulp-notify");
// const sassGlob = require("gulp-sass-glob");
// const mmq = require("gulp-merge-media-queries");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const cssdeclsort = require("css-declaration-sorter");

const sass = require("gulp-dart-sass");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sassGlob = require("gulp-sass-glob-use-forward");
const mmq = require("gulp-merge-media-queries");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");

/* default value */
const themeName = "wp-theme"; // WordPress theme name
const srcSass   = "../sass/**/*.scss"; // sass src path
const distCss   = `../${themeName}/assets/css`; // css output path

gulp.task("sass", function() {
	return gulp
		.src(srcSass)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: "expanded" }))
		// .pipe(sass(  includePaths: ['../sass'],))
		.pipe(postcss([autoprefixer()]))
		.pipe(postcss([cssdeclsort({ order: "alphabetical" })]))
		.pipe(mmq())
		.pipe(gulp.dest(distCss));
});

gulp.task("watch", function(done) {
	gulp.watch(srcSass, gulp.task("sass"));
});

gulp.task("default", gulp.series(gulp.parallel("watch")));
