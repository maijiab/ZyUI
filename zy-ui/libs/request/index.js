import deepMerge from '../function/deepMerge'

class Request{

	constructor() {
	    this.config={
			baseUrl:'',//请求的根域名
			header:{},
			method: 'POST',
			// 设置为json，返回后uni.request会对数据进行一次JSON.parse
			dataType: 'json',
			// 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
			responseType: 'text',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '请求中...',
			loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			timer: null, // 定时器
			originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
			loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		}

		//拦截器
		this.interceptor={
			//请求前的拦截
			request:null,
			//请求后的拦截
			response:null
		}
		
		this.get = (url,data={},header={})=>{
			return this.request({
				method:'GET',
				url,
				header,
				data
			})
		}
		
		this.post = (url,data={},header ={})=>{
			return this.request({
				url,
				method:'POST',
				header,
				data
			})
		}
		
		this.put = (url,data={},header={})=>{
			return this.request({
				url,
				method:'PUT',
				data,
				header
			})
		}
		
		// delete请求，不支持支付宝和头条小程序(HX2.6.15)
		this.delete = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'DELETE',
				header,
				data
			})
		}
	
	}

	
	
	setConfig(customConfig){
		this.config = deepMerge(this.config,customConfig);
	}
	
	request(options = {}){
		
		if(this.interceptor.request && typeof this.interceptor === 'function'){
			let tempConfig = {}
			let interceptorReuest = this.interceptor.request(options)
			if(interceptorReuest === false){
				return false;
			} 
			this.options = interceptorReuest;
		}
		
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = options.url || '';
		options.params = options.params || {};
		options.header = Object.assign(this.config.header, options.header);
		options.method = options.method || this.config.method;
		
		return new Promise((resolve,reject)=>{
			options.complete = (response)=>{
				uni.hideLoading();
				clearTimeOut(this.config.timer);
				this.timer = null;
				if(this.config.originalData){
					if(this.interceptor.response && typeof this.interceptor.response === 'function'){
						let resInterceptors = this.interceptor.reponse(response);
						if(resInterceptors !== false){
							resolve(resInterceptors);
						}else{
							reject(response);
						}
					}else{
						resolve(response);
					}
				}else {
					if(response.statusCode === 200){
						if(this.interceptor.reponse && typeof this.interceptor.reponse === 'function'){
							let resInterceptors = this.interceptor.response(response.data)
							if(resInterceptors !== false){
								resolve(resInterceptors);
							}else{
								reject(response.data);
							}
						}
					}else{
						if(response.errMsg){
							uni.showModal({
								title:reponse.errMsg
							});
						}
						reject(response)
					}			
				}
			}
		})
		
		if(this.config.showLoading&& !this.config.timer){
			this.config.timer = setTimeout(()=>{
				uni.showLoading({
					title:this.config.loadingText,
					mask:this.config.loadingMask
				})
				this.config.timer = null;
			},this.config.loadingTime)
		}
		uni.request(options)
	}
	
}