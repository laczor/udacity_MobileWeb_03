var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    order = require("gulp-order"),
    cleanCSS = require('gulp-clean-css'),
    imageResize = require('gulp-image-resize'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin');
    
//Will minify the css files
gulp.task('copyCss', function() {
    gulp.src('public/css/*css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('js_main', function() {
    gulp.src('public/js/*.js')
    .pipe(gulp.src("public/js/*.js")) // gulp.src passes through input
    .pipe(order([
      "public/js/promise.js",
      "public/js/fetch.js",
      "public/js/idb.js",
      "public/js/dbhelper.js",
      "public/js/main.js",
    ], { base: './' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
});

//It will read all of the js files and will concat them in order, than will transiple them with bable
gulp.task('js_info', function() {
    gulp.src('public/js/restaurant/*.js')
    .pipe(gulp.src("public/js/restaurant/*.js")) // gulp.src passes through input
    .pipe(order([
        "public/js/restaurant/fetch.js",
        "public/js/restaurant/idb.js",
        "public/js/restaurant/dbhelper.js",
        "public/js/restaurant/restaurant_info.js",
      ], { base: './' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle_restaurant_info.js'))
    .pipe(gulp.dest('dist/js/'))
});

//It will look all of the images in the described folder, call the imageResize pacakge and with renaming it will rename the
gulp.task("copyImgsDesktop", function () {
    gulp.src("public/img/*.{jpg,png}")
      .pipe(imageResize({ width : 333, height:250}))
      .pipe(rename(function (path) { path.basename += "-desktop"; }))
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"));
  });

//   gulp.task("fav1", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 57, height:57}))
//       .pipe(rename('apple-icon-57x57.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav2", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 60, height:60}))
//       .pipe(rename('apple-icon-60x60.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav3", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 72, height:72}))
//       .pipe(rename('apple-icon-72x72.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav4", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 76, height:76}))
//       .pipe(rename('apple-icon-76x76.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav5", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 114, height:114}))
//       .pipe(rename('apple-icon-114x114.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });

//   gulp.task("fav6", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 120, height:120}))
//       .pipe(rename('apple-icon-120x120.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav7", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 144, height:144}))
//       .pipe(rename('apple-icon-144x144.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav8", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 152, height:152}))
//       .pipe(rename('apple-icon-152x152.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });
//   gulp.task("fav9", function () {
//     gulp.src("public/img/favicon/*.{jpg,png}")
//       .pipe(imageResize({ width : 180, height:180}))
//       .pipe(rename('apple-icon-180x180.png'))
//       .pipe(imagemin())
//       .pipe(gulp.dest("dist/img/icons"));
//   });

gulp.task("copyImgsMobile", function () {
    gulp.src("public/img/*.{jpg,png}")
      .pipe(imageResize({ width : 250, height:180}))
      .pipe(rename(function (path) { path.basename += "-mobile"; }))
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"));
  });

gulp.task('default', ['copyCss','js_info','js_main','copyImgsDesktop','copyImgsMobile']);
// gulp.task('default', ['copyCss','js_info','js_main','copyImgsDesktop','copyImgsMobile','fav1','fav2','fav3','fav4','fav5','fav6','fav7','fav8','fav9']);