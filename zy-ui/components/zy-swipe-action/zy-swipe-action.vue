<template>
	<view class="">
		<movable-area class="zy-swipe-action" >
			<movable-view class="zy-swipe-view"
						direction="horizontal"
						:disabled="disabled"
						:x="moveX"
						@touchstart="touchstart"
						@touchend="touchend"
						@change="change"
						:style="{
							width:movableViewWidth ? movableViewWidth : '100%'
						}">
					<view class="zy-swipe-content"
						  @tap.stop="contentClick">
						<slot></slot>
					</view>
					<block  v-if="showBtn">
						<view class="zy-swipe-del" :style="[btnStyle(item.style)]" v-for="(item, index) in options" :key="index">
							<view class="zy-btn-text">{{ item.text }}</view>
						</view>
					</block>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
/**
 * swipeAction 左滑单元格
 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。
 * @tutorial https://www.uviewui.com/components/swipeAction.html
 * @property {String} bg-color 整个组件背景颜色（默认#ffffff）
 * @property {Array} options 数组形式，可以配置背景颜色和文字
 * @property {String Number} index 标识符，点击时候用于区分点击了哪一个，用v-for循环时的index即可
 * @property {String Number} btn-width 按钮宽度，单位rpx（默认180）
 * @property {Boolean} disabled 是否禁止某个swipeAction滑动（默认false）
 * @property {Boolean} show 打开或者关闭某个组件（默认false）
 * @event {Function} click 点击组件时触发
 * @event {Function} close 组件触发关闭状态时
 * @event {Function} content-click 点击内容时触发
 * @event {Function} open 组件触发打开状态时
 * @example <u-swipe-action btn-text="收藏">...</u-swipe-action>
 */
export default {
	name: 'zy-swipe-action',
	props: {
	// index值，用于得知点击删除的是哪个按钮
		index: {
			type: [Number, String],
			default: ''
		},
		// 滑动按钮的宽度，单位为rpx
		btnWidth: {
			type: [String, Number],
			default: 180
		},
		// 是否禁止某个action滑动
		disabled: {
			type: Boolean,
			default: false
		},
		// 打开或者关闭组件
		show: {
			type: Boolean,
			default: false
		},
		// 组件背景颜色
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		// 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
		vibrateShort: {
			type: Boolean,
			default: false
		},
		// 按钮操作参数
		options: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	watch: {
		show: {
			immediate: true,
			handler(nVal, oVal) {
				if (nVal) {
					this.open();
				} else {
					this.close();
				}
			}
		}
	},
	data() {
		return {
			scrollX: 0, // movable-view移动过程中产生的change事件中的x轴移动值
			state:false,
			moveX:0,// movable-view元素在x轴上需要移动的目标移动距离，用于展开或收起滑动的按钮
			movableAreaWidth:0,
			elId:this.$u.guid(),
			showBtn: true, // 刚开始渲染视图时不显示右边的按钮，避免视图闪动
		};
	},
	computed: {
		movableViewWidth() {
			return this.movableAreaWidth + this.allBtnWidth + 'px';
		},
		innerBtnWidth() {
			return uni.upx2px(this.btnWidth);
		},
		allBtnWidth() {
			return uni.upx2px(this.btnWidth) * this.options.length;
		},
		btnStyle() {
			return style => {
				let css = {};
				style.width = this.btnWidth + 'rpx';
				return style;
			};
		}
	},
	mounted() {
		this.getActionRect();
	},
	methods: {
		// 点击按钮
		btnClick(index) {
			this.status = false;
			// this.index为点击的几个组件，index为点击某个组件的第几个按钮(options数组的索引)
			this.$emit('click', this.index, index);
		},
		// 关闭按钮状态
		close() {
			this.moveX = 0;
			this.status = false;
		},
		// 打开按钮的状态
		open() {
			if (this.disabled) return;
			this.moveX = -this.allBtnWidth;
			this.status = true;
		},
		emitOpenEvent() {
			this.$emit('open', this.index);
		},
		emitCloseEvent() {
			this.$emit('close', this.index);
		},
		// 用户手指离开movable-view元素，停止触摸
		touchend() {
			this.moveX = this.scrollX;
			this.$nextTick(function(){
				if(this.status == false){
					if(this.scrollX <= -this.allBtnWidth / 4){
						this.moveX = -this.allBtnWidth;
						this.status = true;
						this.emitOpenEvent();
					}else{
						this.moveX = 0; // 如果距离没有按钮宽度的四分之一，自动收起
						this.status = false;
						this.emitCloseEvent();
					}
				} else {
					// 如果在打开的状态下，右滑动的距离X轴偏移超过按钮的四分之一(负值反过来的四分之三)，自动收起按钮
					if (this.scrollX > (-this.allBtnWidth * 3) / 4) {
						this.moveX = 0;
						this.$nextTick(() => {
							this.moveX = 101;
						});
						this.status = false;
						this.emitCloseEvent();
					} else {
						this.moveX = -this.allBtnWidth;
						this.status = true;
						this.emitOpenEvent();
					}
				}
			})
		},
		touchstart(){},
		change(e){
			this.scrollX = e.detail.x
		},
		getActionRect() {
			this.$uGetRect('.zy-swipe-action').then(res => {
				this.movableAreaWidth = res.width;
				// 等视图更新完后，再显示右边的可滑动按钮，防止这些按钮会"闪一下"
				this.$nextTick(() => {
					this.showBtn = true;
				})
			});
		},
		// 点击内容触发事件
		contentClick() {
			// 点击内容时，如果当前为打开状态，收起组件
			if (this.status == true) {
				this.status = 'close';
				this.moveX = 0;
			}
			this.$emit('content-click', this.index);
		}
	}
};
</script>

<style scoped lang="scss">
	.zy-swipe-action{
		width: auto;
		height: inherit;
		position: relative;
		overflow: hidden;
	}

	.zy-swipe-view{
		display: flex;
		height: initial;
		position: relative;
	}
	.zy-swipe-content{
		flex:1;
	}

	.zy-swipe-del{
		position: relative;
		font-size: 30rpx;
		color: #fff;
	}

	.zy-btn-text{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
