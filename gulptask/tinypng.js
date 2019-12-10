var gulp = require('gulp');
var tinypng_nokey = require('gulp-tinypng-nokey');
gulp.task("tinypng", async function () {

    console.log("tinypng开始");

    gulp.src('imgs/**/*.{png,jpg,jpeg,gif,ico}')
        .pipe(tinypng_nokey())
        .pipe(gulp.dest('imgs/imgpng/'));
})