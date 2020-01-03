<template>
	<view class="ctn">
		<hx-navbar title="hx-navbar演示" :fixed="true" :back="false" :background-color="[[28, 187, 180],[141, 198, 63]]" color="#ffffff"/>
		
		<view style="background: #FFFFFF;padding: 15px;"><text>使用该组件需要用到 uni-icons 图标组件，可自行去下载，或则复制本案例中的uni-icons组件至你的项目也可以的。</text></view>
		<uni-section title="常用" type="line"></uni-section>
	    <uni-list>
			<uni-list-item title="最常用" note="超级实用的返回案例" @click="navigate('../demo/demo12')"></uni-list-item>
			<uni-list-item title="简单实用" note="只包含返回图标和中间标题" @click="navigate('../demo/demo1')"></uni-list-item>
		    <uni-list-item title="右边带图标" note="例子用了返回,标题,和右图标及事件" @click="navigate('../demo/demo2')"></uni-list-item>
	    </uni-list>
		
		<uni-section title="背景例子" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="普通单色背景" note="这个没啥说明的,就是单色" @click="navigate('../demo/demo3')"></uni-list-item>
		    <uni-list-item title="线性渐变背景" note="可设置多种颜色渐变,可调整渐变角度" @click="navigate('../demo/demo4')"></uni-list-item>
			<uni-list-item title="透明背景" note="用在不需要背景颜色的情况" @click="navigate('../demo/demo5')"></uni-list-item>
			<uni-list-item title="背景为图片" note="可使用图片作为背景" @click="navigate('../demo/demo6')"></uni-list-item>
			<uni-list-item title="滑动逐渐显示背景" note="滚动屏幕逐渐显示背景颜色,该例子用了渐变色" @click="navigate('../demo/demo7')"></uni-list-item>
		</uni-list>

		<uni-section title="插槽使用" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="左中右三槽使用" note="简单使用三个插槽,和左右插槽事件" @click="navigate('../demo/demo8')"></uni-list-item>
			<uni-list-item title="左中插槽合并使用" note="关闭了左插槽来实现" @click="navigate('../demo/demo9')"></uni-list-item>
		    <uni-list-item title="自定义导航栏" note="这需要关闭左右插槽只使用中间插槽来实现" @click="navigate('../demo/demo10')"></uni-list-item>
			 <uni-list-item title="屏幕滑动切换显示插槽" note="中间插槽、右插槽屏幕滑动后的变换" @click="navigate('../demo/demo11')"></uni-list-item>
		</uni-list> 
		
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {
			navigate(url){
				uni.navigateTo({
				    url: url
				});
			}
		}
	}
</script>

<style>
	.ctn{
		background: #F1F1F1;
	}
</style>
