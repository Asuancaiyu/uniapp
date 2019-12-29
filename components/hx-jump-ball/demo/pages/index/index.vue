<template>
	<view class="hx-store">
		<jumpBall :start.sync="num" :element.sync="element" @msg="jbMsg" :speed="500"/>
		<view class="add" @click="anima()" ><button>起跳1</button></view>
		
		<!-- 头部 -->
		<view class="header">
			<image class="header-bg" src="../../static/img/1.jpg" mode=""></image>
			<view class="container storeInfo">
				<view class="hx-txt-18 hx-color-black hx-txt-weigth">
					十里桃花
				</view>
				<view class="hx-txt-10 hx-color-black ">
					店家说明
				</view>
				<image src="" mode=""></image>
			</view>
		</view>
		
		<!-- 主体 -->
		<view class="main">
			
		</view>
		
		<!-- 购物车 -->
		<view class="container foot ">
			<view class="foot-left" @click="contact">
				<view class="imgBox">
					<image src="../../static/store/contact.png" mode=""></image>
				</view>
				<text>联系商家</text>
			</view>
			<view class="foot-line"></view>
			<view class="foot-center">
				<view class="cart" :animation="cartAnimationData">
					<view class="tag cartNum" v-if="cartNum>0">{{cartNum}}</view>
					<image :src="cartNum ? '/static/store/cart.png' : '/static/store/cart2.png'" mode=""></image>
				</view>
				<view class="priceBox">
					<view class="hx-txt-18 hx-color-white" v-if="total>0">
						￥{{total}}
					</view>
					<view class="hx-txt-10 hx-color-gray">
						另需配送费￥{{shippingDees}}
					</view>
				</view>
				
			</view>
			<view class="foot-right">
				<view class="jiesuan"  v-if="total >= startingPrice" @click="jiesuan">
					去结算
				</view>
				<view class="pscj hx-txt-10 hx-color-gray" v-else>
					差￥{{-(total-startingPrice)}}起送
				</view>
				
			</view>
		</view>
	</view>
</template> 

<script>
	import jumpBall from '@/components/hx-jump-ball/hx-jump-ball.vue';

	export default {
		components: {
		    jumpBall
		},
		data() {
			return {
				num:1,
				element: [],				cartAnimation: {},
				cartAnimationData: {},
				//购物车商品数量
				cartNum: 0,
				//合计
				total: 0,
				//配送费
				shippingDees: 4,
				//配送起步价
				startingPrice:5,
				
			}
		},
		onLoad() {
			this.cartAnimation = uni.createAnimation({
				duration: 800,
				timingFunction: "ease",
				delay: 0
			}); 
		},
		methods: {
			anima(){
				this.element = ['.add','.cart'];
				this.num ++; 
			},
			jbMsg(res){
				let that = this;
				setTimeout(function(){
					that.cartNum ++;
					that.total = that.cartNum;
				},150);
				that.cartAnimation.matrix(1, 0, 0, 0.7, 0, 7).step({duration: 100})
				that.cartAnimationData = that.cartAnimation.export();
				//动画在app端有bug，所以必须写延迟才能解决
				setTimeout(function() {
					that.cartAnimation.matrix(1, 0, 0, 1, 0, 0).step({duration: 150});
					that.cartAnimationData = that.cartAnimation.export();
				},100);
			},
			//去结算
			jiesuan(){
				uni.showModal({
					title:"",
					content:"去结算"
				})
			},
			//联系商家
			contact(){
				uni.showModal({
					title:"",
					content:"联系商家"
				})
			},
			//计算总价
			totalPrice(){
				
			}
		}
	}
</script>

<style lang="scss">
	//主题颜色
	$hx-theme-color: #FFC107;
	$hx-theme-color-light: #FFEB3B;
	
	.add{
		position: fixed;
		right: 60upx;
		top: 300upx;
	}
	page{
		background: #ffffff;
	}
	
	.hx-txt-10{
		font-size: 20upx;
	}
	.hx-txt-16{
		font-size: 32upx;
	}
	.hx-txt-18{
		font-size: 36upx;
	}
	.hx-txt-22{
		font-size: 44upx;
	}
	.hx-color-gray{
		color: #bbbbbb;
	}
	.hx-color-white{
		color: #FFFFFF;
	}
	.hx-color-black{
		color: #222222;
	}
	.hx-txt-weigth{
		font-weight: bold;
	}
	.hx-store{
		.header{
			position: relative;
			height: 600upx;
			&-bg{
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
				width: 100%;
				height: 100%;
			}
			.storeInfo{
				position: absolute;
				z-index: 2;
				top: 200upx;
				left: 0;
				right: 0;
				background: #ffffff;
				height: 200upx;
			}
		}
		.container{
			margin: 0 32upx;
		}
		.foot{
			position: fixed;
			display: flex;
			
			justify-content:center;
			align-items : center; 
			bottom: 12upx;
			height: 90upx;
			
			width: calc(100% - 64upx);
			&-left{
				background: #222222;
				border-top-left-radius:100upx;
				border-top-right-radius:18upx;
				border-bottom-left-radius:100upx;
				border-bottom-right-radius:18upx;
				padding-left: 6upx;
				display: flex;
				flex-direction:column;
				justify-content:center;
				align-self: center;
				width: 140upx;
				height: 100%;
				color: #f6d200;
				text-align: center;
				.imgBox{
					display: flex;
					text-align: center;
					justify-content:center;
					image{
						width: 40upx;
						height: 40upx;
					}
				}
				text{
					font-size: 20upx;
				}
			}
			&-line{
				background: #ffffff;
				width: 4upx;
				height: 100%;
			}
			&-center{
				height: 100%;
				flex: auto;
				display: flex;
				justify-content:flex-start;
				align-self: center;
				align-items: center;
				background: #222222;
				border-top-left-radius:8upx;
				border-bottom-left-radius:8upx;
				padding-left: 10upx;
				.cart{
					position: relative;
					width: 72upx;
					height: 72upx;
					image{
						width: 100%;
						height: 100%;
					}
					.tag{
						position: absolute;
						right: 12upx;
						top: 16upx;
						height: 36upx;
						width: 36upx;
						background-color: #ff4000;
						color: #ffffff;
						border-radius: 50%;
						z-index: 1;
						font-size: 20upx;
						text-align: center;
						line-height: 36upx;
					}
				}
				.priceBox{
					flex: auto;
				}
				
			}
			&-right{
				width: 140upx;
				height: 100%;
				position: relative;
				display: flex;
				justify-content:flex-start;
				align-self: center;
				align-items: center;
				
				
				.pscj{
					width: 100%;
					height: 100%;
					border-top-right-radius:100upx;
					border-bottom-right-radius:100upx;
					background: #222222;
					text-align: center;
					display: flex;
					justify-content:center;
					align-self: center;
					align-items: center;  
				}
				.jiesuan{
					width: 100%;
					height: 100%;
					font-size: 28upx;
					border-top-right-radius:100upx;
					border-bottom-right-radius:100upx;
					text-align: center;
					display: flex;
					justify-content:center;
					align-self: center;
					align-items: center;    
					background: linear-gradient(45deg, $hx-theme-color-light, $hx-theme-color); 
					font-weight: bold;
					color: #222222;
				}
			}
			
		}
	}
</style>
