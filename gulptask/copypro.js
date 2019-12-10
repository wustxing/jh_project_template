var gulp = require('gulp');


gulp.task("cpimgs",async function(){
    return gulp.src('imgs/**/*')
    .pipe(gulp.dest('dist/imgs'))
})
gulp.task("cpjs",async function(){
    return gulp.src('js/**/*')
    .pipe(gulp.dest('dist/js'))
})
gulp.task("cpcss",async function(){
    return gulp.src('css/**/*')
    .pipe(gulp.dest('dist/css'))
})
gulp.task("cphtml",async function(){
    return gulp.src(['**/*.html','!node_modules/**'])
    .pipe(gulp.dest('dist/'))
})


gulp.task('dist',gulp.parallel('cpimgs','cpjs','cpcss','cphtml'));
