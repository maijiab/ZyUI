<template>
	<view class="zy-demo">
		<view class="zy-demo-wrap">
			<view class="zy-demo-title">演示效果</view>
			<view class="zy-demo-area">
				<zy-button  @click="btnClick" :plain="plain" :type="type" :hairLine="hairLine">山川异域，风月同天</zy-button>
			</view> 
		</view>
		<!-- <view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				参数配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主题选择</view>
				<u-subsection vibrateShort :list="['default', 'primary', 'error', 'warning', 'success']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">尺寸大小</view>
				<u-subsection vibrateShort :list="['默认', '中等', '迷你']" @change="sizeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">形状</view>
				<u-subsection vibrateShort :list="['直角', '圆角']" @change="shapeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">镂空</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="plainChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">水波纹(感觉哪里有问题？点击顶部的按钮试试)</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="rippleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">细边框</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="hairLineChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">加载中</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="loadingChange"></u-subsection>
			</view>
		</view>  -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hairLine: true,
				type: 'default',
				size: 'default',
				shape: 'square',
				plain: false,
				ripple: false,
				loading: false,
			}
		},
		methods: {
			typeChange(e) {
				switch (e) {
					case 0:
						this.type = 'default';
						break;
					case 1:
						this.type = 'primary';
						break;
					case 2:
						this.type = 'error';
						break;
					case 3:
						this.type = 'warning';
						break;
					case 4:
						this.type = 'success';
						break;s
				}
			},
			sizeChange(e) {
				switch (e) {
					case 0:
						this.size = 'default';
						break;
					case 1:
						this.size = 'medium';
						break;
					case 2:
						this.size = 'mini';
						break;
				}
			},
			shapeChange(e) {
				this.shape = e == 0 ? 'square' : 'circle';
			},
			plainChange(e) {
				this.plain = e == 0 ? true : false;
			},
			rippleChange(e) {
				this.ripple = e == 0 ? true : false;
			},
			hairLineChange(e) {
				this.hairLine = e == 0 ? true : false;
			},
			loadingChange(index) {
				this.loading = index == 0 ? true : false;
			},
			btnClick() {
				this.$u.toast('按钮被点击')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 30rpx;
	}

	.box /deep/ button {
		margin-bottom: 40rpx;
	}
</style>
