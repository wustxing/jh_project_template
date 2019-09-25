//生成雪碧图

// rem单位的时候需要修改模板 以及源码
// gulp.spritesmith\node_modules\spritesheet-templates\lib\spritesheet-templates.js
  // For each of the x, y, offset_x, offset_y, height, width, add a px after that
// 173-178 行
  //   ['x', 'y', 'offset_x', 'offset_y', 'height', 'width', 'total_height', 'total_width'].forEach(function (key) {
//     if (item[key] !== undefined) {
//       px[key] = item[key] + 'px'; //将这个px修改为rem 

//     }
//   });

// 看看你们转换 rem 和px 除以的多少
// 修改的地方是  item[key]/100+'rem'; 
// 除以100来转换得到rem值。


// 修改gulp.spritesmith\node_modules\spritesheet-templates\lib\templates\css.template.handlebars

// 在模板页中加入生成background-size内容

// .cicon {
//     display: inline-block;
//     background-size: {{spritesheet.px.width}} {{spritesheet.px.height}};
// }


// 参考 https://www.cnblogs.com/zhouzone/p/5275197.html

var gulp = require('gulp');

var spritesmith=require("gulp.spritesmith");
gulp.task("sprite",async function () {
   return gulp.src("src/zhhd/imgs/666/*.png")
        .pipe(spritesmith({
            imgName:'sprite.png',
            cssName:'css/sprite.css',
            padding:5,
            algorithm:'left-right'//排列方向
        }))
        .pipe(gulp.dest('dist/'))
})

const print = require('gulp-print').default;
gulp.task("test",async function () {
    gulp.src("src/zhhd/imgs/x7/*.png")
        // .pipe(print())
        .pipe(spritesmith({
            imgName:'sprite.png',
            cssName:'css/sprite.css',
            padding:5,
            algorithm:'left-right',//排列方向
            algorithmOpts:{sort:false}
        }))
        .pipe(gulp.dest('dist/'))
})
