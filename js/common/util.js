/**
 * 给1970年到当前时间
 * 格式
 * 
 * {
                text: '2019年',
                value: 2019
            }
 */
function getMyYear(){
    //获取到当前年
    let myDate = new Date();
    let curYear = myDate.getFullYear();
    console.log(curYear);
    let endYear = 1970;
    let list= [];
    for(var i=curYear;i>1970;i--){
        let obj = {
            text:i+"年",
            value: i
        }
        list.push(obj);
    }
    return list;
}
// console.log(getMyYear());
/**
 * 12个月
 * {
                text: '1月',
                value: 1
            },
 */
function getMyMonth(){
    let list = [];
    for(var i=0;i<12;i++){
        let obj = {
            text:(i+1)+"月",
            value: i+1
        }
        list.push(obj);
    }

    return list;

}



var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

function getPoster(){
    $(".savePic").hide();
    var canvas1 = document.createElement("canvas");
    var context = canvas1.getContext('2d');
    var scale = getPixelRatio(context);//生成截图放大倍数
    if (scale < 2 || scale == 'undefined' || scale == '') {
        scale = 2;
    }

    var jh_coverMain = $('.saveCon')
    var width = parseInt(jh_coverMain.width()); //获取dom 宽度
    var height = parseInt(jh_coverMain.height()); //获取dom 高度
    canvas1.width = scale * width;
    canvas1.height = scale * height;
    canvas1.style.width = scale * width + "px";
    canvas1.style.height = scale * height + "px";
    context.scale(scale, scale)
    context.translate(-1 * parseInt(jh_coverMain.offset().left), -1 * parseInt(jh_coverMain.offset().top));

    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    html2canvas(jh_coverMain, {
        dpi: window.devicePixelRatio * 2,
        canvas: canvas1,
        allowTaint: true,
        // taintTest: false,
        // width: scale * width, // 设置width
        // height: scale * height, // 设置height
        scale: scale,// 设置scaleBy
        useCORS: true
        // onrendered: 
    }).then(function (canvas){
         var data = canvas.toDataURL("image/png");
        //  console.log(data)
         // 生成图片并重置a标签的href链接及download链接，实现本地下载
         $('.savePic').attr('href',data);
         $('.savePic').attr('download',data);
         $(".savePic").show();
        // download(data);
        // alert("下载完成");
        // window.location.reload();
    });
}   


  //下载图片
  function download(imgDataB64) {
    let imgData = imgDataB64;
    this.downloadFile('码.png', imgData);
  }
  //下载
  function downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = this.base64ToBlob(content); //new Blob([content]);

    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);

    // aLink.dispatchEvent(evt);
    //aLink.click()
    aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
  }
  //base64转blob
  function  base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }

 //校验是否为手机号码
function isMonbile(phone){
    var data = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!data.test(phone)) {
        return false;
    } else {
        return true;
    }
}

/*
	changeImg(fil1, imgURL, 'id名')
	var fil1 = e.target.files[0];
    var fil = this.files[0];
    var imgURL = window.URL.createObjectURL(fil);
*/
function changeImg(fil1, imgURL, id){
	var mAlloyCrop = new AlloyCrop({
        image_src: imgURL,
        circle: true,
        width: 200,
        height: 200,
        output: 1,
        ok: function (base64, canvas) {
            //获取图片信息
            EXIF.getData(fil1, function () {
                var o = EXIF.getAllTags(this);
                var orientation = o.Orientation;
                var img = new Image();
                img.src = base64;
                img.onload = function () {
                    // 这里添加旋转图片的代码
                    const data64 = getRotateImg(img, orientation);
                    document.getElementById(id).src = data64;
                    //用这个data64上传
                };
            });
            mAlloyCrop.destroy();
            // showToolPanel();
        },
        cancel: function () {
            mAlloyCrop.destroy();
            // showToolPanel();
        },
        ok_text: "确定",
        cancel_text: "取消"

    });
}

function getRotateImg(img, or) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // 图片原始大小
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    switch (or) {
        case 6: // 顺时针旋转90度
            rotateImg(img, 'right', canvas);
            break;
        case 8: // 逆时针旋转90度
            rotateImg(img, 'left', canvas);
            break;
        case 3: // 顺时针旋转180度
            rotateImg(img, 'right', canvas, 2);
            break;
        default:
            console.log("9999999", or);
            break;
    }

    var dataURL = canvas.toDataURL();
    return dataURL;
}

//具体旋转
function rotateImg(img, dir = 'right', canvas, s = 1) {
    const MIN_STEP = 0;
    const MAX_STEP = 3;

    const width = canvas.width || img.width;
    const height = canvas.height || img.height;
    let step = 0;

    if (dir === 'right') {
        step += s;
        step > MAX_STEP && (step = MIN_STEP);
    } else {
        step -= s;
        step < MIN_STEP && (step = MAX_STEP);
    }

    const degree = step * 90 * Math.PI / 180;
    const ctx = canvas.getContext('2d');

    switch (step) {
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height, width, height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            // ctx.drawImage(img, -width, -height, width, height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            // ctx.drawImage(img, -width, 0, width, height);
            break;
        default:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            break;
    }
}    