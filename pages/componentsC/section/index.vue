<template>
	<view class="zy-demo">
		<view class="zy-demo-wrap">
			<view class="zy-demo-title">演示效果</view>
			<view class="zy-demo-area">
				<zy-section :title="title" :right="right" :bold="bold" :color="color"></zy-section>
			</view>
		</view>
		<view class="zy-config-wrap">
			<view class="zy-config-title zy-border-bottom">
				参数配置
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">更换主标题</view>
				<zy-subsection vibrateShort :current="1" :list="['是', '否']" @change="titleChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">是否显示右边部分</view>
				<zy-subsection vibrateShort :list="['是', '否']" @change="rightChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">主标题粗体</view>
				<zy-subsection vibrateShort :list="['是', '否']" @change="boldChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">主标题颜色</view>
				<zy-subsection vibrateShort :list="['默认', '自定义']" @change="colorChange"></zy-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '红豆生南国',
				bold: true,
				right: true,
				color: this.$u.color['mainColor']
			}
		},
		methods: {
			titleChange(index) {
				if(index == 0) this.title = '春来发几枝';
				else  this.title = '红豆生南国';
			},
			rightChange(index) {
				this.right = index == 0 ? true : false;
			},
			boldChange(index) {
				this.bold = index == 0 ? true : false;
			},
			colorChange(index) {
				this.color = index == 0 ? this.$u.color['mainColor'] : this.$u.color['primary'];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zy-demo {}
</style>
