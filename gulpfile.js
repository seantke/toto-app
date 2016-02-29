'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
// var browserSync = require('browser-sync');

// gulp.task('browser-sync', ['nodemon'], function() {
// 	browserSync.init(null, {
// 		proxy: "http://localhost:3000",
//         files: ["public/**/*.*"],
//         browser: "google chrome",
//         port: 7000,
// 	});
// });
gulp.task('nodemon', function(){
  nodemon({
    script: "lib/server.js",
    ignore: "/public/**/*"
  });
});

gulp.task('default', ['nodemon'], function () {
});
