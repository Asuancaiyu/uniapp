# hx-navbar 适用于 uni-app 项目的头部导航组件

导航栏组件，主要用于头部导航，组件名：hx-navbar

本组件目前兼容微信小程序、H5、5+APP。

### 本组件支持模式：
1. 普通固定顶部导航  
2. 透明导航  
3. 透明固定顶部导航 
4. 不固定普通导航
5. 背景颜色线性渐变
6. 滑动显示背景
7. 左、中、右3个插槽；可关闭左右插槽使中间插槽铺满导航，实现高度自定义的导航需求

### 使用方式	
页面使用需在 ``` script ``` 中引用组件
``` javascript
import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"
export default {
    components: {hxNavbar}
}
```

全局使用需在 ``` main.js ```  中注册组件
``` javascript
import hxNavbar from "./components/hx-navbar/hx-navbar.vue"
Vue.component('hx-navbar',hxNavbar)

```


### 属性
| 名称                        | 类型            | 默认值                | 描述                                               |
| ----------------------------|--------------- | ---------------------- | ---------------------------------------------------|
| back                   	  | Boolean         | true          | 返回上一页，（设置后，```leftIcon```属性，和```click-left```事件将失效|
| height                   	  | String         | 44px          | 导航栏高度（不包含状态栏高度）|
| statusBar                   | Boolean         | true          | 包含状态栏|
| barPlaceholder              | String         | auto          | 导航栏占位符 显示（show），隐藏（hidden），自动（auto：如果头部为固定fiexd ，则显示占位符）               |
| title                       | String         | -             | 导航标题（当设置了标题，中间插槽将失效）                                     |
| leftSlot                    | Boolean        | true          | 开启左插槽                                        |
| rightSlot                   | Boolean        | true          | 开启右插槽                                      |
| leftIcon                    | String         | -             | 左插槽图标，必须为 ```uni-icons``` 图标                                       |
| rightIcon   				  | String         | -             | 左插槽图标，必须为 ```uni-icons``` 图标  |
| fixed                       | Boolean        | false         | 固定头部|
| color                       | String         | #000000       | 导航文字颜色                                        |
| backgroundColor             | Array          | [255, 255, 255]          | 导航背景颜色为RGB 编号（单色背景数组为```[255,255,255]```，线性渐变背景```[[236, 0, 140],[103, 57, 182],...]```）                                      |
| backgroundColorLinearDeg    | String         | 45             | 导航背景线性渐变角度                                       |
| backgroundImg   			  | String         | -             | 导航背景图片（背景图片优先级高于背景颜色）  |
| transparent   			  | String         | show             | 背景透明（show 不透明,hidden 透明,auto 自动：滑动逐渐显示背景颜色，当头部固定时生效）  |
| statusBarFontColor          | Array,String   | #000000         | 状态栏字体颜色，只支持```#000000 ```和```#FFFFFF```（如果需要滑动变色参数则为数组，例子：```['#000000','#ffffff']```）|
| shadow                      | Boolean         | false         | 导航栏阴影          |
| border                      | Boolean         | false         | 导航栏边框                           |

### 插槽
| 名称                  | 描述                                                               |
| ----------------------|-------------------------------------------------------------------|   
| left                  | 左插槽 （可关闭该插槽 ```leftSlot``` 属性）                                                        |
| default               | 中间插槽（当设置了标题，中间插槽将失效）                               |
| right                 | 右插槽 （可关闭该插槽 ```rightSlot``` 属性）                                                            |

### 事件
| 名称             | 参数              | 描述                      |
| -----------------|------------------| --------------------------|
| click-left       | -                | 左侧按钮点击时触发          |
| click-right      | -                | 右侧按钮点击时触发          |

``` html
<hx-navbar>
    <view>标题栏</view>
    <view slot="left">left</view>
    <view  slot="right">right</view>
</hx-navbar>
```


## 使用例子

### 简单使用
``` html
<hx-navbar title="我爱新疆" left-text="返回" />
```

### 背景颜色线性渐变、头部固定
``` html
<hx-navbar 
	title="颜色渐变" 
	:back="false"
	:fixed="true"
	color="#ffffff"
	:background-color="[[28, 187, 180],[141, 198, 63]]">
</hx-navbar>
```

### 滑动显示背景
``` html
<!-- 该例子取消了导航占位符 -->
<hx-navbar 
	title="颜色渐变" 
	:back="false"
	:fixed="true"
	color="#ffffff"
	barPlaceholder="hidden"
	transparent="auto"
	:background-color="[[28, 187, 180],[141, 198, 63]]">
</hx-navbar>
```

### 左中插槽演示
``` html
<hx-navbar  
	:back="false" 
	:fixed="true"
	right-icon="scan">
	<block slot="left">
		<view class="city">
			<view>新疆</view>
			<uni-icons type="arrowdown" color="#333333" size="22" />
		</view>
	</block>
	<view class="input-view">
		<uni-icons type="search" size="22" color="#666666" />
		<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
	</view>
</hx-navbar>


/*css 用于演示插槽自定义样式*/
<style>
	.city{
		display: flex;flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
		white-space: nowrap;
	}
</style>
```

### 关闭左右插槽演示
``` html
<hx-navbar  :back="false" :fixed="true" :leftSlot='false' :rightSlot='false'>
	<view style="display: flex;">
		<view class="city">
			<view>新疆</view>
			<uni-icons type="arrowdown" size="22" />
		</view>
		<view class="input-view" style="width: 100%;">
			<uni-icons type="search" size="22" color="#666666" />
			<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
		</view>
		<uni-icons type="scan" size="22" style="line-height: 44px;padding-left: 8px;"/>
	</view>
</hx-navbar>
/*css 用于演示插槽自定义样式*/
<style>
	.city{
		display: flex;flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
		white-space: nowrap;
	}
</style>
```