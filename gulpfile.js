var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');//合并文件
var connect = require('gulp-connect');//服务器
var autoprefixer = require('gulp-autoprefixer')

var requireDir = require('require-dir');   // 就是这个插件
var dir = requireDir('./gulptask'); //这样就可以直接使用 gulptask下的任务了



gulp.task('commonSassTaks',async function() {
    return gulp.src('./scss/common/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(concat('common.css'))
        .pipe(gulp.dest('./css'))
})
gulp.task('Sasstask',async function(){
    return gulp.src(['./scss/*.scss','!./src/pingtuan/scss/common/*'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});
gulp.task('reload',async function () {
    return gulp.src("./**/**")
        .pipe(connect.reload())
})
gulp.task('ptwatch', async function(){
    gulp.watch(['./scss/**/*.scss',"./scss/*.scss","./*.html"],gulp.parallel('Sasstask','commonSassTaks','reload'));
});
gulp.task('connect', function() {
    connect.server({
        livereload: true,
        port:8182,
        root: './',
    });
});
gulp.task('server',gulp.parallel('Sasstask','commonSassTaks','connect','ptwatch'));




