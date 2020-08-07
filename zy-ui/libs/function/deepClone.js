// function deepClone(target,map){
// 	if(typeof target === 'object'){
// 		const isArray = Array.isArray(target) ? []:{};
// 		let cloneTarget = isArray;
// 		if(map.get(target)){
// 			return map.get(target)
// 		};
// 		map.set(target,cloneTarget);
// 		forEach(target,cloneTarget);
		
// 		return cloneTarget;
// 	}else{
// 		return cloneTarget;
// 	}
// }


// function forEach(target,cloneTarget){
// 	const keys = Object.keys(target); 
// 	const length = keys.length; 
// 	let index = -1; 

// 	while (++index < length) { 
// 		cloneTarget[keys[index]] = deepClone(target[keys[index]], map); 
// 	}
// }

// export default deepClone


// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone (obj) {
	// 对常见的“非”值，直接返回原来值
	if([null, undefined, NaN, false].includes(obj)) return obj;
    if(typeof obj !== "object" && typeof obj !== 'function') {
		//原始类型直接返回
        return obj;
    }
    var o = isArray(obj) ? [] : {};
    for(let i in obj) {
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}

export default deepClone;


