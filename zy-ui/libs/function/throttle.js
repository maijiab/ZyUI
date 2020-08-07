//节流
/**
 * @description Throttle的作⽤是，在设定的时间间隔内，丢弃其中发出的时间
 * 防⽌触发滚动，按键按下，调整⼤⼩等事件触发过于频繁
 * 函数节流会⽤在⽐input, keyup更频繁触发的事件中，如resize, touchmove, mousemove, scroll。 
 * throttle 会强制函数以固定的速率执⾏。因此这个⽅法⽐较适合应⽤于动画相关的场 景。
 * @param {*} fn 
 * @param {*} threshold 
 */
function throttle(fn,threshold){
    var timeout;
    var start = new Date;
    var threshold = threshold || 160;
    return function (){
        var context = this,cur = new Date() -0,args= arguments;
        clearTimeout(timeout);
        if(cur - start >= threshold){
            fn.apply(context,args)
            start = cur
        }else{
            timeout = setTimeout(function(){
                fn.apply(context,args)
            },threshold)
        }
    }
}

