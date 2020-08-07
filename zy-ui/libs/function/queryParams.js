/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 */
function queryParams(data = {}, isrefix = true, arrayFormat = 'brackets') {
	let isPrefix = isrefix?'?':'';
	let _result = [];
	if(['indices','brackets','repeat','comma'].indexOf(arrayFormat)===-1){
		arrayFormat = 'brackets';
	}
	for(let i in data){
		let value = data[i];
		if(['',undefined,null].indexOf(value) !== -1 ){
			continue;
		}
		if(value.consructor === Array){
			switch (arrayFormat) {
				case 'indices':
					// 结果: ids[0]=1&ids[1]=2&ids[2]=3
					for (let i = 0; i < value.length; i++) {
						_result.push(key + '[' + i + ']=' + value[i])
					}
					break;
				case 'brackets':
					// 结果: ids[]=1&ids[]=2&ids[]=3
					value.forEach(_value => {
						_result.push(key + '[]=' + _value)
					})
					break;
				case 'repeat':
					// 结果: ids=1&ids=2&ids=3
					value.forEach(_value => {
						_result.push(key + '=' + _value)
					})
					break;
				case 'comma':
					// 结果: ids=1,2,3
					let commaStr = "";
					value.forEach(_value => {
						commaStr += (commaStr ? "," : "") + _value;
					})
					_result.push(key + '=' + commaStr)
					break;
				default:
					value.forEach(_value => {
						_result.push(key + '[]=' + _value)
					})
			}
		} else{
			_result.push(`${i}=${value}`)
		}
	}
	return _result.length ? prefix + _result.join('&'):''
}

export default queryParams;
