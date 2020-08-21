<template>
	<view class="zy-demo">
		<view class="zy-demo-wrap">
			<view class="zy-demo-title">演示效果</view>
			<view class="zy-demo-area">
				<zy-count-down class="count-down-demo"  :timetamp="timestamp" :separator="separator" :showBorder="showBorder"
				:separator-color="separatorColor" :showDays="showDays" :fontSize="fontSize" @change="change" ref="uCountDown"
				:border-color="borderColor" :color="color" @end="end" bg-color="rgb(250, 250, 250)"></zy-count-down>
			</view>
		</view>
		<!-- <view class="zy-config-wrap">
			<view class="zy-config-title zy-border-bottom">
				参数配置
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">调整时间</view>
				<zy-subsection vibrateShort :list="['60', '86400', '983272']" @change="timestampChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">分隔符</view>
				<zy-subsection vibrateShort :list="['英文冒号', '中文名称']" @change="separatorChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">自定义样式</view>
				<zy-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">显示天</view>
				<zy-subsection vibrateShort current="1" :list="['是', '否']" @change="showDaysChange"></zy-subsection>
			</view>
			<view class="zy-config-item">
				<view class="zy-item-title">字体大小</view>
				<zy-subsection vibrateShort current="1" :list="['26', '30', '34']" @change="fontSizeChange"></zy-subsection>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			timestamp: 60,
			separator: 'colon',
			showBorder: false,
			borderColor: '#303133',
			color: '#303133',
			showDays: false,
			fontSize: 30,
			separatorColor: '#303133',
		};
	},
	methods: {
		timestampChange(index) {
			this.timestamp = index == 0 ? 60 : index == 1 ? 86400 : 983272;
		},
		separatorChange(index) {
			this.separator = index == 0 ? 'colon' : 'zh';
		},
		styleChange(index) {
			if(index == 0) {
				this.showBorder = true;
				this.borderColor = this.$u.color['primary'];
				this.color = this.$u.color['primary'];
				this.separatorColor = this.$u.color['primary'];
			} else {
				this.showBorder = false;
				this.borderColor = '#303133';
				this.color = '#303133';
				this.separatorColor = '#303133';
			}
		},
		showDaysChange(index) {
			this.showDays = index == 0 ? true : false;
		},
		fontSizeChange(index) {
			this.fontSize = index == 0 ? 26 : index == 1 ? 30 : 34;
		},
		end() {
			this.$refs.uToast.show({
				title: '倒计时结束',
				type: 'warning'
			})
		},
		change(timestamp) {
			// console.log(timestamp);
		},
		getSeconds() {
			// console.log(this.$refs.uCountDown.seconds);
		}
	}
};
</script>

<style scoped lang="scss">
.count-down-demo {
	justify-content: center;
}
</style>
