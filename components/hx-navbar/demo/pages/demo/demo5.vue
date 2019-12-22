<template>
	<view>
		<hx-navbar 
			title="新疆了解一下" 
			:fixed="true"
			bar-placeholder="hidden"
			transparent="hidden"
			color="#ffffff"/>
		
		
		
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
			info(){
				uni.showToast({
				    title: '你点我了',
					icon: 'success'
				});
			}
		}
	}
</script>

<style>

</style>
