<template>
	<view class="zy-waterfall">
		<view id="zy-left-column" class="zy-column">
			<slot name="left" :leftList="leftList"></slot>
		</view>
		<view id="zy-right-column"  class="zy-column">
			<slot name="right" :rightList="rightList"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: "zy-waterfall",
	props: {
		value:{
			type:Array,
			required:true,
			default:function(){
				return [];
			}
		},
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: 200
		},
		// id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
		// 那么该把idKey设置为idx
		idKey: {
			type: String,
			default: 'id'
		}
	},
	provide() {
	
	},
	data() {
		return{
			leftList:[],
			rightList:[],
			tempList:[],
		}
	},
	watch: {
		copyFlowList(nVal, oVal) {
			console.log(nVal, oVal);
			// 取差值，即这一次数组变化新增的部分
			let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
			// 拼接上原有数据
			this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
			this.splitData();
		}
	},
	mounted() {
		this.tempList = this.$u.deepClone(this.copyFlowList);
		this.splitData();
	},
	computed: {
		copyFlowList(){
			return this.$u.deepClone(this.value)
		}
	},
	methods: {
		async splitData(){
			if (!this.tempList.length) return;
			let leftRect = await this.$uGetRect('#zy-left-column');
			let rightRect = await this.$uGetRect('#zy-right-column');
			// 如果左边小于或等于右边，就添加到左边，否则添加到右边
			let item = this.tempList[0];
			// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
			// 数组可能变成[]，导致此item值可能为undefined
			if(!item) return ;
			if (leftRect.height < rightRect.height) {
				this.leftList.push(item);
			} else if (leftRect.height > rightRect.height) {
				this.rightList.push(item);
			} else {
				// 这里是为了保证第一和第二张添加时，左右都能有内容
				// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
				if (this.leftList.length <= this.rightList.length) {
					this.leftList.push(item);
				} else {
					this.rightList.push(item);
				}
			}
			console.log(this.leftList);
			// 移除临时列表的第一项
			this.tempList.splice(0, 1);
			// 如果临时数组还有数据，继续循环
			if (this.tempList.length) {
				setTimeout(() => {
					this.splitData();
				}, this.addTime)
			}
		},
			
		
	}
}
</script>

<style lang="scss" scoped>
	.zy-waterfall{
		display: flex;
		flex-direction:row;
		align-self: flex-start;
	}

	.zy-column {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: auto;
	}

	.zy-image{
		width:100%;
	}
</style>
