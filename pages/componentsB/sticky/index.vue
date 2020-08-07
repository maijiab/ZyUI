<template>
	<view style="height:1400px" >
		<view class="zy-demo-wrap">
			<view class="zy-demo-title" style="height:400px">演示效果</view>

			<zy-sticky :offset-top="offsetTop" :enable="enable" @fixed="fixed" @unfixed="unfixed">
				<view class="sticky">
					宝剑锋从磨砺出,梅花香自苦寒来
				</view>
			</zy-sticky>
		</view>
		<!-- <view class="zy-config-wrap">
			<view class="zy-config-title zy-border-bottom">
				参数配置
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">吸顶高度</view>
				<zy-subsection vibrateShort :list="[0, 120, 200]" @change="offsetTopChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">状态</view>
				<zy-subsection vibrateShort :list="['允许吸顶', '禁止吸顶']" @change="enableChange"></zy-subsection>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offsetTop: 0,
				enable: true,
			}
		},
		methods: {
			offsetTopChange(index) {
				this.offsetTop = index == 0 ? 0 : index == 1 ? 120 : 200;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
			enableChange(index) {
				this.enable = index == 0 ? true : false;
			},
			fixed() {
			// 	this.$refs.uToast.show({
			// 		type: 'warning',
			// 		title: '触发吸顶'
			//	})
			},
			unfixed() {
			// 	this.$refs.uToast.show({
			// 		type: 'success',
			// 		title: '取消吸顶'
			// 	})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zy-demo-area {
		overflow: hidden;
	}
	
	.zy-config-wrap {
		height: 200vh;
	}
	
	.zy-demo-title {
		margin-bottom: 140rpx;
	}
	
	.sticky {
		background-color: $zy-type-primary;
		color: #fff;
		padding: 24rpx;
		margin: auto;
		font-size: 28rpx;
		line-height: 1;
		border-radius: 5px;
	}
</style>
