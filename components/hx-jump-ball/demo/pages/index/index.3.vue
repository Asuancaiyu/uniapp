<template>
	<view>
		<jumpBall :start.sync="num" :element.sync="element" backgroundImage="/static/logo.png" @msg="jbMsg" />
		  <jumpBall :start.sync="num2" :element.sync="element2" backgroundImage="/static/logo.png" @msg="jbMsg" />
		<view class="add" @click="anima()" ><button>起跳1</button></view>
		<view class="add2" @click="anima2()"><button>起跳2</button></view>  
		<view class="foot"><view class="cart">测试位置</view></view>
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
				num2: 1,
				element: [],element2: [],
			}
		},
		methods: {
			anima(){
				this.element = ['.add','.cart'];
				this.element2 = ['.add2','.cart'];
				this.num ++; 
				this.num2 ++; 
			},
			anima2(){
				this.element2 = ['.add2','.cart'];
				this.num2 ++; 
			
			}, 
			jbMsg(res){
				console.log("执行回调",res.code);
			}
		}
	}
</script>

<style>
	.add{
		position: fixed;
		right:30px;
		top: 150px;
	}
	.add2{
		position: fixed;
		right:30px;
		top: 250px;
	}
	.foot{
		position: fixed;
		bottom: 0;
		height: 90upx;
		background: #e1e1e1;
		width: 100%;
	}
	.foot .cart{
		width: 180upx;
		margin-left: 60upx;
		height: 90upx;
		background: #999999;
		line-height: 90upx;
		text-align: center;
	}
</style>
