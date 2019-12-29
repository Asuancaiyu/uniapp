<template>
	<view class="m-store-store">
		<view class="m-store-banner">
			<view class="m-content">
				<view class="m-message">
					<view class="m-img">
					</view>
					<view class="m-body">
						<view class="m-title">
							蔬菜001号(中关村店)
						</view>
						<view class="m-text">
							公告：全场绿色蔬菜活动特价8.5折进行中
						</view>
						<view class="m-time">
							营业：07:00-23:00
						</view>
					</view>
					<view class="m-phone">
						<image style="width: 40upx;height:40upx;" src="../../static/img/icon/shop_icon_phone.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
		        <view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.title}}
					</view>
				</view>
		    </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i">
							<!-- 商品列表 -->
							<m-store-pro @touchOnGoods="touchOnGoods" :rowData="box"></m-store-pro>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>		
		<m-footer-car :price="'￥'+carPrice" :num="carNum" @handleFn="showSpec(false)"></m-footer-car>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="m-shopcar-box">
					<view class="m-header">
						<view class="m-line">
							<view class="">
								购物车
							</view>
							<view class="m-light">
								共{{carNum}}件商品
							</view>
						</view>
						<view class="m-clear-car" @tap="clearCar">
							清空购物车
						</view>
					</view>
					<view v-for="(item,index) in insideCarGoods" :key="index" class="m-shopcar-item">
						<view class="m-title">
							{{item.name}}
						</view>
						<view class="m-price">
							{{item.price}}
						</view>
						<view class="m-controne">
							<uni-number-box :rowData="item" @change="bindChange" :min="0" :max="9"></uni-number-box>
						</view>
					</view>
				</view>
				<m-footer-car :price="'￥'+carPrice" :num="carNum" @handleFn="showSpec(false)"></m-footer-car>
			</view>
		</view>
		<view class="good_box" v-show="!hide_good_box"  :style="'left:'+bus_x+'px;top:'+bus_y+'px'"></view>
	</view>
</template>
<script>
	import mFooterCar from '@/components/m-footer-car' // 底部购物车
	import mStorePro from '@/components/m-store-pro' // 商品列表
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue" // 加减数字
	// 抛物线计算
	function bezier (pots, amount) {
	  var pot;
	  var lines;
	  var ret = [];
	  var points;
	  for (var i = 0; i <= amount; i++) {
	    points = pots.slice(0);
	    lines = [];
	    while (pot = points.shift()) {
	      if (points.length) {
	        lines.push(pointLine([pot, points[0]], i / amount));
	      } else if (lines.length > 1) {
	        points = lines;
	        lines = [];
	      } else {
	        break;
	      }
	    }
	    ret.push(lines[0]);
	}
	function pointLine(points, rate) {
	    var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
	    var ret = [];
	    pointA = points[0];//点击
	    pointB = points[1];//中间
	    xDistance = pointB.x - pointA.x;
	    yDistance = pointB.y - pointA.y;
	    pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
	    tan = yDistance / xDistance;
	    radian = Math.atan(tan);
	    tmpPointDistance = pointDistance * rate;
	    ret = {
	      x: pointA.x + tmpPointDistance * Math.cos(radian),
	      y: pointA.y + tmpPointDistance * Math.sin(radian)
	    };
	    return ret;
	  }
	  return {
	    'bezier_points': ret
	  };
	}
	export default {
		components:{
			mStorePro,
			uniNumberBox,
			mFooterCar
		},
		data() {
			return {
				// 购物车小球动画start
				 hide_good_box: false,
				 bus_x:0,
				 bus_y:0,
				 finger:{},
				 busPos:{},
				 linePos:[],
				 timer:null,
				// 购物车小球动画end
				carPrice:"0", //加入到购物车的总价钱
				carNum:0, //加入到购物车的总个数
				insideCarGoods:[],// 加入到购物车的商品列表
				
				specClass: '',//规格弹窗css类，控制开关动画
				showCategoryIndex:0,
				//商品分类信息列表
				categoryList:[
					{id:1,title:'生鲜果蔬',banner:'../../static/img/category/banner.jpg',list:[
						{   id:1,
							name:'精品秋葵600g',
							descripe:"脆糯营养，口感好，健康绿色",
							img:'../../static/img/1.jpg',
							price:"￥9",
							oldprice:"￥100"
						},
						{   id:2,
							name:'精品秋葵600g',
							descripe:"脆糯营养，口感好，健康绿色",
							img:'../../static/img/2.jpg',
							price:"￥8",
							oldprice:"￥100"
						}
						
					]},
					{id:2,title:'鲜花绿植',banner:'../../static/img/category/banner.jpg',list:[
						{   id:3,
							name:'玫瑰花',
							descripe:"脆糯营养，口感好，健康绿色",
							img:'../../static/img/1.jpg',
							price:"￥4",
							oldprice:"￥2"
						},
						{    id:4,
							name:'康乃馨紫色',
							descripe:"脆糯营养，口感好，健康绿色",
							img:'../../static/img/2.jpg',
							price:"￥3",
							oldprice:"￥100"
						}
					]}
				]
			}
		},
		methods:{
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			// popup start
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调
			
				this.selectSpec&&this.specCallback&&this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback(){
				return;
			},
			discard(){
				
			},
			// popup end
			// 加入购物车start
			touchOnGoods(obj){
				const e = obj.element;
				const data = obj.data;
				if(this.timer){ // 清除一下动画
					clearInterval(this.timer);
				}
				this.finger = {}; var topPoint = {};
				this.finger['x'] = e.target.x;//点击的位置
				this.finger['y'] = e.target.y;
				if (this.finger['y'] < this.busPos['y']) {
				  topPoint['y'] = this.finger['y'] - 150;
				} else {
				  topPoint['y'] = this.busPos['y'] - 150;
				}
				topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

				if (this.finger['x'] > this.busPos['x']) {
				  topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
				} else {//
				  topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
				}
				this.linePos = bezier([this.busPos, topPoint, this.finger], 30);
				this.startAnimation(e,data);
			},
			startAnimation: function (e,data) {
				var index = 0, that = this,
				bezier_points = that.linePos['bezier_points'];
				that.hide_good_box= false
				that.bus_x=that.finger['x'];
			    that.bus_y=that.finger['y'];
				var len = bezier_points.length;
				index = len;
				that.timer = setInterval(function () {
					index--;
					that.bus_x= bezier_points[index]['x'];
					that.bus_y= bezier_points[index]['y'];
					if (index < 1) {
					  clearInterval(that.timer);
					  that.hide_good_box= true;
					  that.addGoodSum(e,data)
					}
				}, 25);
			},
			// 购物车价钱与个数计算， 根据你的需求计算
			addGoodSum(e,data){
				let newdata = {...data};
				let price = data.price.replace("￥",'');
				data.num=1;
				let index = this.insideCarGoods.findIndex(item=>item.id==newdata.id);
				if(index==-1){
					this.insideCarGoods.push(data);
				}else{
					this.insideCarGoods[index].num+=1;
				}
				
				this.numPrice();
			},
			/* 数字输入框改变 
			getdata对象返回三个参数 
			newval新值 
			oldval旧值 
			rowData是绑定给组件的rowdata对象
			此地方为模拟数据 一般情况下 此地方会改成http请求
			*/
			bindChange(getdata){
				let inputnewNum = getdata.newval;
				let inputoldNum = getdata.oldval;
				let rowData = getdata.rowData;
				let obj = this.insideCarGoods.filter((item)=>item.id==rowData.id)[0];
				let oldprice = obj['price'].replace("￥",'')*1;
				obj['price']="￥"+(oldprice*inputnewNum);
				obj['num']=inputnewNum;
				this.numPrice();
			},
			numPrice(){
				let price = 0;
				let num =0;
				this.insideCarGoods.forEach((item)=>{
					price+=item.price.replace("￥",'')*1;
					num+=item.num*1;
				})
				this.carPrice=price;
				this.carNum=num;
			},
			//清空购物车
			clearCar(){
				this.insideCarGoods=[]
			}
		},
		watch:{
			insideCarGoods(val){
				console.log(val);
			}
		},
		onLoad() {
			let hh = 0;
			const that = this;
			that.busPos['x'] = 45;//购物车的位置
			//  #ifdef H5
			hh = document.body.clientHeight;
			that.busPos['y'] = hh - 56;
			//  #endif  
			
			//  #ifdef MP-WEIXIN  
			wx.getSystemInfo({
				success: function(res) {
					hh = res.windowHeight;
					that.busPos['y'] = hh - 56;
				}
			})
			//  #endif  
		}
		
	}
</script>
<style lang="scss">
	
	@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(-100%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(-100%);
			}
			100% {
				transform: translateY(0);
			}
		}
	.m-store-banner{
		min-height: 270upx;
		position: relative;
		padding-top: 20upx;
		background:#eee;
		// background:url("../../static/img/storebanner.png");
		background-size: 100% 200upx;
		background-repeat: no-repeat;
		.m-content{
			width: 690upx;
			position: relative;
			bottom: 10upx;
			left: 30upx;
			right: 30upx;
			margin-top: 30upx;
			background:#fff;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			z-index: 100;
			.m-message{
				padding:20upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				.m-img{
					flex:0 0 135upx;
					height: 135upx;
					// background:url("../../static/img/storebanner.png");
				}
				.m-body{
					flex: 1;
					// padding: 20upx;
					padding-left: 10upx;
					padding-bottom: 0;
					.m-title{
						font-size: 32upx;
						color:#333333
					}
					.m-text{
						font-size: 20upx;
						color:#999999;
						line-height: 38upx;
						margin-top: 10upx;
					}
					.m-time{
						font-size: 20upx;
						color:#999999;
						margin-top: 10upx;
					}
				}
				.m-phone{
					flex:0 0 40upx;
					text-align: right
				}
			}
		}
	}
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 300;
		display: none;
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			padding: 0;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			// 购物车
			.m-shopcar-box {
				width: 100%;
				// padding: 30upx 0;
				.m-header{
					padding: 30upx 30upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.m-line{
						display: flex;
						color:#333333;
						font-size: 30upx;
						.m-light{
							color:#333333;
							font-size: 22upx;
							padding-left: 10upx;
						}
					}
					.m-clear-car{
						color:#333333;
						font-size:22upx;
					}
				}
				.m-shopcar-item{
					margin-left: 30upx;
					margin-right: 30upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items:center;
					border-top: 1px solid #eee;
					padding: 20upx;
					&:last-of-type{
						border-bottom: 1px solid #eee;
					}
					.m-title{
						color:#4c4c4c;
						font-size: 26upx;
					}
					.m-price{
						color:#ff582b;
						font-size: 26upx;
					}
					.m-controne{
						// flex: 
					}
				}
			}
			.btn {
				width: 100%;
				height: 100upx;
				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		&.service {
			.row {
				margin: 30upx 0;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}
			.sp {
				display: flex;
				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;
					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}
			.length{
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				.text{
					font-size: 30upx;
				}
				.number{
					display: flex;
					justify-content: center;
					align-items: center;
					.input{
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						input{
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}
					
					.sub ,.add{
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;
						.icon{
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							
						}
					}
				}
			}
			
		}
	}
	// 商品列表样式
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		padding-bottom: 99upx;
		
		.left,.right{
			background: #fff;
			position: absolute;
			top: 289upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}
		.left{
			width: 24%;
			left: 0upx;
			background-color: #f6f3f3;
			
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color:#999999;
					.block{
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					.text{
						font-size: 30upx;
						// font-weight: 600;
						// color: #2d2d2d;
						.block{
							width: 10upx;
							height: 80%;
							top: 10%;
							// background-color: #f06c7a;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
// 				width: 94%;
				padding: 20upx 30upx;
			
				.list{
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: 100%;
					}
				}
			}
		}
	}
	/*抛物线小球*/
	.good_box{
	  width: 10px;
	  height: 10px;
	  position: fixed;
	  border-radius: 50%;
	  overflow: hidden;
	  left: 50%;
	  top: 50%;
	  z-index: +99;
	  background:#ff582b;
	}
</style>

