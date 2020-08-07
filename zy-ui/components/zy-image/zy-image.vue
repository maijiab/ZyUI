<template>
	<view
		class="zy-image"
		@tap="onClick"
		:style="[wrapStyle,backgroundStyle]">
		<image
			v-if="!isError"
			:src="src"
			:mode="mode"
			@error="onErrorhandler"
			@load="onLoadHandler"
			:lazy-load="lazyLoad"
			class="zy-image__image"
			:style="{
				borderRadius:shape == 'circle'?'50%':$u.addUnit(borderRadius),
			}"
		></image>
		<view v-if="showLoading && loading" class="zy-image__loadimg" :style="{
			borderRadius:shape == 'circle' ? '50%' : $u.addUnit(borderRadius),
			backgroundStyle:this.bgColor
		}">
			<slot v-if="$slots.loading" name="loading"></slot>
			<zy-icon v-else :name="loadingIcon"></zy-icon>
		</view>
		<view v-if="isError && showError && !loading" class="zy-image__error" :style="{
			borderRadius:shape == 'circle' ? '50%' : $u.addUnit(borderRadius),
		}">
			<slot v-if="$slots.error" name="error"></slot>
			<zy-icon v-else :name="errorIcon"></zy-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//图片地址
			src:{
				type:String,
				default:''
			},
			//裁剪模式
			mode:{
				type:String,
				default:'aspetFill'
			},
			//宽度，任意单位
			width:{
				type:[String,Number],
				dafault:'100%'
			},
			//高度，任意单位
			height:{
				type:[String,Number],
				default:'auto'
			},
			//图片形状，circle-圆形,square-方形
			shape:{
				type:String,
				default:'square'
			},
			//是否懒加载，
			lazyLoad:{
				type:Boolean,
				default:true
			},
			//是否需要淡入浅出效果
			fade:{
				type:Boolean,
				default:true
			},
			duration:{
				type:[String,Number],
				default:500
			},
			borederRadius:{
				type:[String,Number],
				default:0
			},
			//背景颜色,用于深色页面加载图片时，为了和背景色融合
			bgColor:{
				type:String,
				default:'#f3f4f6'
			}
		},
		
		compued:{
			wrapStyle() {
				let style = {}
				style.width = this.$u.addUnit(this.width);
				style.height = this.$u.addUnit(this.height);
				style.borderRadius = this.shape == 'circle'？'50%':this.$u.addUnit(this.borderRadius);
				style.overflow = this.borderRadius > 0 ? 'hidden':'visible';
				if(this.fade){
					style.opacity = this.opacity;
					style.transition = `opacity ${Number(this.durationTime) / 100}s`
				}
				return style
			}
		},
		methods:{
			onLoadHanler(){
				this.loading = false;
				this.isError = false;
				this.$emit('load');
				if(this.fade)
			}
		}
	}
</script>

<style  scoped lang="scss">
	.zy-image {
        position: relative;
        transition: opacity 0.5s ease-in-out;

        &__image {
            width: 100%;
            height: 100%;
        }

        &__loading, &__error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $u-bg-color;
            color: $u-tips-color;
            font-size: 46rpx;
        }
    }
</style>
