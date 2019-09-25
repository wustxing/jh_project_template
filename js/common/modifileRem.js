

/*
* 适用于获取屏幕宽度等分设置html的font-size情况，比如 flexible.js库
*/
// 计算最终html font-size
function modifileRootRem () {
    var root = window.document.documentElement;
    var fontSize = parseFloat(root.style.fontSize);
    var finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue("font-size"));
    if(finalFontSize === fontSize) return;
    root.style.fontSize=fontSize*fontSize/finalFontSize+ "px";
}
modifileRootRem();
