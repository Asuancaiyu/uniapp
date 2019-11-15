<template>
	
	<view class="hx-navbar">
		<!-- 搜索 -->
		<view
			:class="{'hx-navbar--fixed': fixed,'hx-navbar--shadow':border,'hx-navbar--border':border}"
			:style="{'background': backgroundColorRgba}"
			
			class="hx-navbar__content">
			<view :style="{ height: statusBarHeight }" class="hx-status-bar" v-if="statusBar" ></view>
			<view :style="{color:color,height: height,'line-height':height}" class="hd hx-navbar__header hx-navbar__content_view">
				<view class="hx-navbar__header-btns hx-navbar__content_view"  @tap="onClickLeft" v-if="leftSlot">
					<block v-if="leftText.length || leftIcon.length || back">
						<view
							v-if="leftIcon.length || back"
							class="hx-navbar__content_view">
							<uni-icons :type="back ? 'arrowleft' : leftIcon" :color="color" size="24"/>
						</view>
						<view
							v-if="leftText.length"
							:class="{'hx-navbar-btn-icon-left':!leftIcon.length}"
							class="hx-navbar-btn-text hx-navbar__content_view">{{ leftText }}</view>
						
					</block>
					<block v-else>
						<slot name="left"/>
					</block>
				</view>
			  
			  
				<view class="hx-navbar__header-container hx-navbar__content_view">
					<view
					  v-if="title.length"
					  class="hx-navbar__header-container-inner hx-navbar__content_view">{{ title }}</view>
					<!-- 标题插槽 -->
				
					<block v-else><slot/></block>
				</view>
				
				<view :class="title.length?'hx-navbar__header-btns-right':''"
					class="hx-navbar__header-btns hx-navbar__content_view"
					@tap="onClickRight"
					v-if="rightSlot">
					<view v-if="rightIcon.length" class="hx-navbar__content_view">
						<uni-icons :type="rightIcon" :color="color" size="24"/>
					</view>
					<!-- 优先显示图标 -->
					<view v-if="rightText.length&&!rightIcon.length" class="hx-navbar-btn-text hx-navbar__content_view">{{ rightText }}</view>
					<slot name="right"/>
				</view>
			  
			</view>
		</view>
		
		<view
		  v-if="placeholder" 
		  class="hx-navbar__placeholder">
		  <view :style="{ height: statusBarHeight }" class="hx-status-bar" v-if="statusBar" ></view>
		 
		  <view :style="{ height: height}" />
		</view>
	</view>
	
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	//获取系统状态栏高度
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		name: "hx-navbar",
		components: {
		  uniIcons
		},
		data() {
			return {
				 statusBarHeight: statusBarHeight,
				 transparentValue: 0,
				 navTransparentFixedFontColor: '#fff',
				 
				 statusBarFontColorInfo: [],
				 backgroundColorRgba: 'rgba(255,255,255,1)',
				 backgroundColorRgb: 'rgb(222,222,222)',
				 
				 placeholder: false,
			};
		},
		
		props:{
			height:{
				type: String,
				default: "44px"
			},
			//导航栏占位符 显示（show），隐藏（hidden），自动（auto：如果头部为固定fiexd ，则显示占位符）
			barPlaceholder:{
				type: String,
				default: "auto"
			},
			//返回上一页
			back:{
				type: [Boolean, String],
				default: true
			},
			//标题
			title: {
			  type: String,
			  default: ''
			},
			//是否开启左插槽
			leftSlot:{
				type: [Boolean, String],
				default: true
			},
			//是否开启右插槽
			rightSlot:{
				type: [Boolean, String],
				default: true
			},
		
			//左边文字
			leftText: {
			  type: String,
			  default: ''
			},
			//右插槽文字
			rightText: {
			  type: String,
			  default: ''
			},
			//左插槽图标
			leftIcon: {
			  type: String,
			  default: ''
			},
			//右插槽图标
			rightIcon: {
			  type: String,
			  default: ''
			},
			//是否固定头
			fixed: {
			  type: [Boolean, String],
			  default: false
			},
			//文字颜色
			color: {
			  type: String,
			  default: "#666666"
			},
			//导航栏背景颜色
			backgroundColor: {
			  type: Array,
			  default: function(){
				  return new Array([255,255,255],[255,255,255]);
			  }
			},
			//线性渐变角度
			backgroundColorLinearDeg: {
				type: String,
				default: '45'
			},
			//背景图片
			backgroundImg: {
				type: String,
				default: ''
			},
			//背景透明（show,hidden,auto）
			transparent: {
				type: String,
				default: 'show'
			},
			//状态栏字体颜色，只支持黑（#000000）和白（#FFFFFF）两种颜色。（,）
			statusBarFontColor:{
				type: [Array,String],
				default:function(){
				  return new Array("#000000","#000000");
				} 
			},
			//是否包含状态栏
			statusBar: {
			  type: [Boolean, String],
			  default: true
			},
			//导航栏阴影
			shadow: {
			  type: [String, Boolean],
			  default: false
			},
			//导航栏边框
			border: {
			  type: [String, Boolean],
			  default: false
			},
			
		},
		created(){
			var that = this;
			
			//是否添加占位符
			switch (that.barPlaceholder){
				case 'show':
					that.placeholder = true;
					break;
				case 'hidden':
					that.placeholder = false;
					break;
				case 'auto':
					if(that.fixed){
						that.placeholder = true;
					}
					break;
			}
			
			//设置状态栏文字颜色
			that.setStatusBarFontColor();

			//导航栏透明设置 及监听滚动
			switch (that.transparent){
				case 'show':
					that.transparentValue = 1;
					break;
				case 'hidden':
					that.transparentValue = 0;
					break;
				case 'auto':
					//获取所有活动页面
					let currentPages = getCurrentPages();
					//监听当前页滚动条
					// #ifndef H5
					currentPages[currentPages.length-1].onPageScroll = function(e) {
						that.$emit('scroll', e);
						if (e.scrollTop > 100) {
							that.transparentValue = 1;
							
						} else {
							that.transparentValue = e.scrollTop / 100;
						}
						that.setBgColor();
					};
					// #endif
					// #ifdef H5
					window.onscroll = function(e) {
						let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						that.$emit('scroll', { scrollTop: scrollTop });
						if (scrollTop > 100) {
							that.transparentValue = 1;
						} else {
							that.transparentValue = scrollTop / 100;
						}
						that.setBgColor();
					};
					// #endif
					break;
			}
			that.setBgColor();
			
			
		},
		methods: {
			
			onClickLeft () {
				if(this.back){
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.$emit('click-left')
				}
		    },
		    onClickRight () {
				this.$emit('click-right')
		    }, 
			//背景颜色
			setBgColor(){
				var that = this;
				//如果存在背景图片则背景颜色失效
				if(that.backgroundImg){
					that.backgroundColorRgba = "url(" + that.backgroundImg + ")";
					return;
				}
				//背景颜色
				if(typeof that.backgroundColor[0] == 'object'){
					let l = that.backgroundColor.length;
					if( l >= 2){
						let rgbStr = "linear-gradient("+ that.backgroundColorLinearDeg +"deg,";
						let c = null;
						for(var i in that.backgroundColor){
							c = that.backgroundColor[i];
							rgbStr += "rgba("+ c[0] + "," + c[1] + "," + c[2] +"," + that.transparentValue+")";
							
							if(l != (i*1)+1){
								rgbStr += ",";
							}
						}
						rgbStr += ")"; 
						that.backgroundColorRgba = rgbStr;
					}
				}else{
					let rgbStr = that.backgroundColor[0] + ','+  that.backgroundColor[1] + ','+  that.backgroundColor[2];
					that.backgroundColorRgb= 'rgb('+ rgbStr + ')';
					that.backgroundColorRgba = 'rgba('+ rgbStr +',' + that.transparentValue+')';
				}

			},
			setStatusBarFontColor(){
			  var that = this;
			  if(typeof that.statusBarFontColor == 'string'){
				that.statusBarFontColorInfo = [that.statusBarFontColor,that.statusBarFontColor];
			  }else if(typeof that.statusBarFontColor == 'object'){
				if (that.statusBarFontColor.length==1){
					that.statusBarFontColorInfo = [that.statusBarFontColor[0],that.statusBarFontColor[0]];
				}else if(that.statusBarFontColor.length>=2){
					that.statusBarFontColorInfo = [that.statusBarFontColor[0],that.statusBarFontColor[1]];
				}
			  }
			  
			  uni.setNavigationBarColor({
				frontColor: that.statusBarFontColorInfo[0],
				backgroundColor: that.backgroundColorRgb
			  });
			}
		  
		},
		//监控
		computed: {
			//监控透明度变化
			setNavStatusBarFontcolor() {
				var that = this;
				//this.settingColor();
				if(this.transparentValue > 0.8){
					
					uni.setNavigationBarColor({
						frontColor: that.statusBarFontColorInfo[1],
						backgroundColor: that.backgroundColorRgb
					});
				}else if(this.transparentValue < 0.2){
					uni.setNavigationBarColor({
						frontColor: that.statusBarFontColorInfo[0],
						backgroundColor:  that.backgroundColorRgb
					});
				}
				return this.transparentValue;
				
			}
			
			
		},
		
		
	}
</script>

<style lang="scss">
	$nav-height: 44px;
	
	.hd{
		overflow: hidden;
	}
	.hx-status-bar {
		display: block;
		width: 100%;
		height: 20px;
		height: var(--status-bar-height);
	}
	//防止其他ui影响
	.hx-navbar uni-view,
	.hx-navbar uni-scroll-view,
	.hx-navbar uni-swiper,
	.hx-navbar uni-button,
	.hx-navbar uni-input,
	.hx-navbar uni-textarea,
	.hx-navbar uni-label,
	.hx-navbar uni-navigator,
	.hx-navbar uni-image {
		box-sizing: unset;
	}
	.hx-navbar {
		
		padding-top: 0;
		overflow: hidden;
		/* #ifdef MP */
		padding-right: 190upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-right: 220upx;
		/* #endif */
		/* #ifdef MP-ALIPAY */
		padding-right: 150upx;
		/* #endif */
		&__content {
			display: block;
			position: relative;
			width: 100%;
			background-color: $uni-bg-color;
			
	
			.hx-navbar__content_view {
				// line-height: $nav-height;
				display: flex;
				align-items: center;
			}
		}
	
		&__header {
			display: flex;
			flex-direction: row;
			width: 100%;
			height:  $nav-height;
			line-height: $nav-height;
			font-size: 16px;
	
			&-btns {
				display: inline-flex;
				flex-wrap: nowrap;
				flex-shrink: 0;
				width: 120upx;
				padding: 0 12upx;
	
				&:first-child {
					padding-left: 0;
				}
	
				&:last-child {
					width: 60upx;
				}
	
	    &-right:last-child{
	      width: 120rpx;
	      text-align: right;
	      flex-direction: row-reverse;
	    }
			}
	
			&-container {
				width: 100%;
				margin: 0 10upx;
	
				&-inner {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 30upx;
					// padding-right: 60upx;
				}
			}
		}
	
		&__placeholder {
			&-view {
				height: $nav-height;
			}
		}
	
		&--fixed {
			position: fixed;
			top:0;
			z-index: 998;
		}
	
		&--shadow {
			box-shadow: 0 1px 6px #ccc;
		}
	
		&--border:after {
			position: absolute;
			z-index: 3;
			bottom: 0;
			left: 0;
			right: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: $uni-border-color;
		}
	}
</style>
