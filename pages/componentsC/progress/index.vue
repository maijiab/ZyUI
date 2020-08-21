<template>
	<view class="zy-demo">
		<view class="zy-demo-wrap">
			<view class="zy-demo-title">演示效果</view>
			<view class="zy-demo-area">
				<!-- <zy-line-progress v-if="mode == 'line'" :percent="percent" :active-color="activeColor" 
				:striped="striped" :stripedActive="stripedActive"></zy-line-progress> -->
				<zy-circle-progress :percent="percent" :active-color="activeColor" 
				bg-color="rgb(250, 250, 250)">
					<view class="zy-progress-content">
						<view class="zy-progress-dot"></view>
						<text class='zy-progress-info'>查找中</text>
					</view>
				</zy-circle-progress>
			</view>
		</view>
		<!-- <view class="zy-config-wrap">
			<view class="zy-config-title zy-border-bottom">
				参数配置
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">模式选择</view>
				<zy-subsection vibrateShort :current="current" :list="['线型', '圆型']" @change="modeChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">增减</view>
				<zy-subsection vibrateShort :list="['减少30%', '增加30%']" @change="calcChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">自定义样式(线型时有效)</view>
				<zy-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">动态条纹(线型时有效)</view>
				<zy-subsection vibrateShort current="1" :list="['是', '否']" @change="stripedChange"></zy-subsection>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent: 50,
				mode: 'line',
				activeColor: '#19be6b',
				striped: false,
				stripedActive: false,
				current: 0,
			}
		},
		methods: {
			modeChange(index) {
				this.current = index;
				this.mode = index == 0 ? 'line' : 'circle';
			},
			calcChange(index) {
				this.percent = index == 0 ? (this.percent - 30) : (this.percent + 30);
				if(this.percent > 100) this.percent = 100;
				if(this.percent < 0) this.percent = 0;
			},
			styleChange(index) {
				this.activeColor = index == 0 ? this.$u.color['error'] : '#19be6b';
				if(index == 0) {
					this.mode = 'line';
					this.current = 0;
				}
			},
			stripedChange(index) {
				this.striped = index == 0 ? true : false;
				this.stripedActive = this.striped;
				if(index == 0) {
					this.mode = 'line';
					this.current = 0;
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.zy-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.zy-progress-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #fb9126;
	}
	
	.zy-progress-info {
		font-size: 28rpx;
		padding-left: 16rpx;
		letter-spacing: 2rpx
	}
</style>
