<template>
	<view>
		<view class="zy-wrap-wrap" :class="[elClass]" :style="{
			height: fixed ? height + 'px' : 'auto',
			backgroundColor: bgColor
		}">
			<view class="zy-sticky" :style="{
				zIndex:uZindex,
				position:fixed? 'fixed' : 'static',
				top: stickyTop +'px',
				left:left+'px',
				width:width == 'auto' ? 'auto' : width + 'px'
			}">
				<slot></slot>	
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		name: "zy-sticky",
		props: {
			//吸顶容器到某个距离的时候，进行吸顶，在H5平台，navigationBar为44px
			offsetTop:{
				type:[Number,String],
				default:0
			},
			//列表中的索引值
			index:{
				type:[Number,String],
				default:''
			},
			//是否开启吸顶功能
			enable:{
				type:Boolean,
				default:true
			},
			//H5导航栏的高度
			h5NavHeight:{
				type:[Number,String],
				default:44
			},
			//吸顶区域的背景颜色
			bgColor:{
				type:String,
				default:'#ffffff'
			},
			//z-index的值
			zIndex:{
				type:[Number,String],
				default:''
			}
		},
		data() {
			return {
				fixed:false,
				height:'auto',
				stickyTop:0,
				elClass:this.$u.guid(),
				left:0,
				width:'auto'
			};
		},
		watch: {
			offsetTop(val) {
				this.initObserver();
			},
			enable(val) {
				if (val == false) {
					this.fixed = false;
					this.disconnectObserver('contentObserver');
				} else {
					this.initObserver();
				}
			}
		},
		computed: {
			uZindex(){
				return this.zIndex ? this.zIndex : this.$u.zIndex.sticky;
			}
		},
		mounted() {
			this.initObserver();
		},
		methods: {
			initObserver(){

				if (!this.enable) return;
				// #ifdef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) + this.h5NavHeight : this.h5NavHeight;
				// #endif
				// #ifndef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) : 0;
				// #endif

				this.disconnectObserver('contentObserver');
				this.$uGetRect('.' + this.elClass).then((res) => {
					this.height = res.height;
					this.left = res.left;
					this.width = res.width;
					this.$nextTick(() => {
						this.observeContent();
					});
				});

			},

			disconnectObserver(observerName){
				const observer = this[observerName];
				observer&&observer.disconnet()
			},
			observeContent() {
				this.disconnectObserver('contentObserver');
				//http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
				const contentObserver = this.createIntersectionObserver({
					thresholds: [0.95, 0.98, 1]
				});
				// 相对于页面可视区
				contentObserver.relativeToViewport({
					top:-this.stickyTop
				});
				contentObserver.observe('.'+this.elClass,res=>{
					if(!this.enable) return;
					this.setFixed(res.boundingClientRect.top);
				})
				this.contentObserver = contentObserver;
			},
			setFixed(top) {
				const fixed = top < this.stickyTop;
				if (fixed) this.$emit('fixed', this.index);
				else if(this.fixed) this.$emit('unfixed', this.index);
				this.fixed = fixed;
			},
			disconnectObserver(observerName){
				const observer = this[observerName];
				observer&&observer.disconnet();
			}
		}
	}
</script>

<style scoped lang="scss">
	.zy-sticky{
		z-index:9999999;
	}
</style>
