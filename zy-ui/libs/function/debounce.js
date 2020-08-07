
/**
 * @deprecated Debounce(防抖)是，当两次事件发⽣⼩于设定的间隔时，丢弃前⼀次的事件。在lodash的 _.debounce函数中，未被丢弃的事件会在设定间隔后触发
 * 输⼊的⾃动联想或者校验
 * 这种情况下，只有⽤户最后⼀次输⼊的，才是我们需要验证或者联想的。
 * 如果不做节流，每次 都去做请求或者验证，⽹络和性能开销⼤（远程联想需要请求⽹络，速度较慢，前端的校验可能会 有⼀些性能开销⽐较⼤的联想。
 * @param {*} func 
 * @param {*} delay 
 */
function debounce(func, delay){
    var timeout
    return function(e) { 
        clearTimeout(timeout); 
        var context = this, args = arguments 
        timeout = setTimeout(function(){ 
            func.apply(context, args); 
        },delay)
    };
}