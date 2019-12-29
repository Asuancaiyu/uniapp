<template>
	<!-- 门店商品图文 -->
	<view class="m-store-item">
		<view class="m-img">
			<image style="width: 100%;height: 100%;" :src="rowData.img" mode="aspectFit"></image>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{rowData.name}}
			</view>
			<view class="m-descripe">
				{{rowData.descripe}}
			</view>
			<view class="m-price">
				{{rowData.price}}
			</view>
			<view class="m-old-price">
				非会员价
				<view class="m-num">
					{{rowData.oldprice}}
				</view>
				
			</view>
		</view>
		<view class="m-distance">
			<image @tap="touchOnGoods($event,rowData)" style="width:40upx;height: 40upx;" src="../../static/img/icon/shop_icon_buy.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-store-pro",
		props:{
			rowData:{
				type:Object,
				rowData:{}
			}
		},
		methods:{
		 touchOnGoods(e,data){
			 this.$emit("touchOnGoods",{
				 element:e,
				 data:data
			 })
		 }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.m-store-item{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 30upx;
	margin-bottom: 30upx;
	.m-img{
		flex: 0 0 170upx;
		height: 170upx;
		background: #eee;
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: 32upx;
			color:#4c4c4c;
		}
		.m-descripe{
			font-size: 24upx;
			color:#999999;
			margin-top: 10upx;
		}
		.m-price{
			font-size: 28upx;
			color:#ff582b;
			font-weight: bold;
			margin-top: 5upx;
		}
		.m-old-price{
			display: flex;
			flex-direction: row;
			font-size: 18upx;
			color:#999999;
			margin-top: 5upx;
			.m-num{
				// font-size:  20upx;
			}
		}
	}
	.m-distance{
		flex: 0 1 30upx;
		color:#b2b2b2;
		font-size: 20upx;
		text-align: right
	}
}
</style>
