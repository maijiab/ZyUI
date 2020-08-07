<template>
	<view class="list-wrap">
		<zy-cell-group  v-for="(item, index) in list" :key="index">
			<zy-cell-item :titleStyle="{fontWeight: 500}" @click="openPage(item1.path)" :title="item1.title" v-for="(item1, index1) in item.list" :key="index1">
				<image slot="icon" class="zy-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
			</zy-cell-item>
		</zy-cell-group>
	</view>
</template>

<script>
	import list from "./components.config.js";
	export default {
		data() {
			return {
				list: list,
			}
		},
		computed: {
			getIcon() {
				return path => {
					return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
				}
			}
		},
		created() {
			
		},
		methods: {
			openPage(path) {
				this.$u.route({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zy-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
</style>