<template>
	<view class="zy-cell-box">
		<view class="zy-cell-title" v-if="title" :style="[titleStyle]">
			{{title}}
		</view>
		<view class="zy-cell-item-box" :class="{'zy-border-bottom zy-border-top': border}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * cellGroup 单元格父组件Group
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配zy-cell-item
	 * @property {String} title 分组标题
	 * @property {Boolean} border 是否显示外边框（默认true）
	 * @property {Object} title-style 分组标题的的样式，对象形式，如{'font-size': '24rpx'} 或 {'fontSize': '24rpx'}
	 * @example <zy-cell-group title="设置喜好">
	 */
	export default {
		name: "zy-cell-group",
		props: {
			// 分组标题
			title: {
				type: String,
				default: ''
			},
			// 是否显示分组list上下边框
			border: {
				type: Boolean,
				default: true
			},
			// 分组标题的样式，对象形式，注意驼峰属性写法
			// 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
			titleStyle: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				index: 0,
			}
		},
	}
</script>

<style lang="scss" scoped>
	
	.zy-cell-box {
		width: 100%;
	}

	.zy-cell-title {
		padding: 30rpx 32rpx 10rpx 32rpx;
		font-size: 30rpx;
		text-align: left;
		color: $zy-tips-color;
	}

	.zy-cell-item-box {
		background-color: #FFFFFF;
	}
</style>
