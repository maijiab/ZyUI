<template>
	<view
		class="zy-circle-progress"
		:style="{
			width: widthPx + 'px',
			height: widthPx + 'px',
			backgroundColor: 'red'
		}"
	>
		<!-- 支付宝小程序不支持canvas-id属性，必须用id属性 -->
		<canvas
			class="zy-canvas-bg"
			:canvas-id="elBgId"
			:id="elBgId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
	</view>
</template>

<script>

export default {
	name: 'zy-circle-progress',
	props: {
		// 整个圆形的宽度，单位rpx
		width: {
			type: [Number, String],
			default: 200
		},
	},
	data() {
		return {
			// #ifdef MP-WEIXIN
			elBgId: 'uCircleProgressBgId', // 微信小程序中不能使用this.$u.guid()形式动态生成id值，否则会报错
			elId: 'uCircleProgressElId',
			// #endif
			// #ifndef MP-WEIXIN
			elBgId: this.$u.guid(), // 非微信端的时候，需用动态的id，否则一个页面多个圆形进度条组件数据会混乱
			elId: this.$u.guid(),
			// #endif
			widthPx: uni.upx2px(this.width), // 转成px后的整个组件的背景宽度

		};
	},
	watch: {
	
	},
	created() {
	
	},
	computed: {
	
	},
	mounted() {
		// 在h5端，必须要做一点延时才起作用，this.$nextTick()无效(HX2.4.7)
		setTimeout(() => {
			this.drawProgressBg();
		}, 50);
	},
	methods: {
		drawProgressBg() {
			let ctx = uni.createCanvasContext(this.elBgId, this);
			ctx.setLineWidth(4); // 设置圆环宽度
			ctx.setStrokeStyle('blue'); // 线条颜色
			ctx.beginPath(); // 开始描绘路径
			// 设置一个原点(110,110)，半径为100的圆的路径到当前路径
			let radius = 100 / 2;
			ctx.arc(radius, radius, radius - 4, 0, 2 * Math.PI, false);
			ctx.stroke(); // 对路径进行描绘
			ctx.draw();
		},
	}
};
</script>

<style lang="scss" scoped>
.zy-circle-progress {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.zy-canvas-bg {
	position: absolute;
}

.zy-canvas {
	position: absolute;
}
</style>
