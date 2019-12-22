<template>
	<view>
		<hx-navbar
		:border="true" 
		:centerSlidiSwitch="true"
		:rightSlidiSwitch="true"
		:fixed="true">
			<view style="text-align: center;width: 100%;">
				<text>帮助反馈</text>
			</view>
			<view slot="centerAfter" style="text-align: center;width: 100%;">
				<text>咨询</text>
			</view>
			<block slot="right">
				<uni-icons type="qq" size="30" ></uni-icons>
			</block>
			<block slot="rightAfter">
				<uni-icons type="chat" size="30" ></uni-icons>
			</block>
		</hx-navbar>
		
		
		<image src="/static/xj.jpg" mode="" style="width: 100%;"></image>
		<view style="background: #FFFFFF;padding:0 15px 15px;" v-for="(item,index) in 4" :key="index">
			<uni-section title="大美新疆" type="line"></uni-section>
			<text>{{item}}.{{doc}}</text>
			<view style="padding-top: 15px;"/>
			<text>{{doc2}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"doc": "没到过新疆的人，闭上眼睛想想跳入脑海中的新疆元素肯定是草原、骆驼、马、羊和扎着许多小辫的维吾尔族姑娘。",
				"doc2": "其实现在新疆的城市和内地没任何区别，千篇一律，千人一面，乏善可陈。但是，新疆和内地确实不同，城市之外有荒无人烟的辽阔戈壁，浩瀚如海的沙漠，碧波荡漾的草原，还有宝石般的高山湖泊，巍峨的天山昆仑和阿勒泰山及纵横交错的河流及广阔田野。"
			}
		},
		methods: {
			info2(){
				uni.showToast({
				    title: '扫码',
					icon: 'success'
				});
			},
			info(){
				uni.showToast({
				    title: "选新疆",
					icon: 'success'
				});
			},
			confirm(e){
				console.log(e.detail.value)
				uni.showToast({
				    title: e.detail.value,
					icon:'none'
				});
			}
		}
	}
</script>

<style>
	.ctn{
		border-radius: 40px;
		padding: 4px 15px;
		border: 1px solid #e3e3e3;
		width: 100%;
		display: flex;
		line-height: 44rpx;
		margin: 0 10px;
	}
	.city{
		display: flex;flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		white-space: nowrap;
	}
</style>
