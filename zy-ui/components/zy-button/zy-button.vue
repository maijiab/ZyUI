<template>
    <button
        id="zy-wave-btn"
        class="zy-btn zy-line-1 zy-fix ios-appearance"
        :class="[
            'zy-size-' +size,
            plain ? 'zy-btn--' + type + '--plain' : '',
            loading?'zy-loading':'',
            shape == 'circle' ? 'zy-round-circle' : '',
            hairLine ? showHairLineBorder : 'zy-btn--bold-border',
            'u-btn--' + type,
            disabled ? `u-btn--${type}--disabled` : '',
        ]"
        :disabled="disabled"
        :loading="loading"
        @tap.stop="click($event)"
    >
        <slot></slot>    
        <view
            v-if="ripple"
            class="zy-wave-ripple"
            :class="[waveActive ? 'zy-wave-active' : '']"
            :style="{
				top: rippleTop + 'px',
				left: rippleLeft + 'px',
				width: fields.targetWidth + 'px',
				height: fields.targetWidth + 'px',
				'background-color': rippleBgColor || 'rgba(0, 0, 0, 0.15)'
			}"
        ></view>    
  </button>
</template>

<script>
    export default {
        name: 'zy-button',
        props:{
            // 是否细边框
            hairLine: {
                type: Boolean,
                default: true
            },
            size:{
                type:String,
                default:'default'
            },
            plain:{
                type:Boolean,
                default:false
            },
            type:{
                type:String,
                default:'default'
            },
            loading:{
                type:Boolean,
                default:false
            },
            shape:{
                type:String,
                default:'square'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 水波纹的背景颜色
            rippleBgColor: {
                type: String,
                default: ''
            },
            // 是否开启水波纹效果
            ripple: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            // 当没有传bgColor变量时，按钮按下去的颜色类名
            getHoverClass() {
                // 如果开启水波纹效果，则不启用hover-class效果
                if (this.loading || this.disabled || this.ripple || this.hoverClass) return '';
                let hoverClass = '';
                hoverClass = this.plain ? 'u-' + this.type + '-plain-hover' : 'u-' + this.type + '-hover';
                return hoverClass;
            },
            // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
            showHairLineBorder() {
                if (['primary', 'success', 'error', 'warning'].indexOf(this.type) >= 0 && !this.plain) {
                    return '';
                } else {
                    return 'zy-hairline-border';
                }
            }
        },

        data() {
            return {
                rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
                rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
                fields: {}, // 波纹按钮节点信息
                waveActive: false // 激活水波纹
            };
        },

        methods:{
            click(e){
                if(this.loading === true || this.disabled === true) return
                if(this.ripple){
                    this.waveActive = false; 
                    this.$nextTick(function(){
                        this.getWaveQuery(e)
                    })
                }
                this.$emit('click');
            },
            getWaveQuery(e){
                this.getElQuery().then(res=>{
                    let data = res[0];
                    if (!data.width ) return;
                    data.targetWidth = data.height>data.width ? data.height: data.width;
                    if(!data.targetWidth) return;
                    this.fields = data;
                    let touchesX = '',
                        touchesY = '';
                    // #ifdef MP-BAIDU
                    touchesX = e.changedTouches[0].clientX;
                    touchesY = e.changedTouches[0].clientY;
                    // #endif
                    // #ifdef MP-ALIPAY
                    touchesX = e.detail.clientX;
                    touchesY = e.detail.clientY;
                    // #endif
                    // #ifndef MP-BAIDU || MP-ALIPAY
                    touchesX = e.touches[0].clientX;
                    touchesY = e.touches[0].clientY;
                    // #endif
                    this.rippleTop = touchesY - data.top - data.targetWidth / 2;
                    this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
                    this.$nextTick(() => {
                        this.waveActive = true;
                    });
                });
            },
            getElQuery(){
                return new Promise(resolve =>{
                    let queryInfo = '';
                    queryInfo = uni.createSelectorQuery().in(this);
                   //#ifdef MP-ALIPAY
                    queryInfo = uni.createSelectorQuery();
                    //#endif
                    queryInfo.select('.zy-btn').boundingClientRect();
                    queryInfo.exec(data=>{
                        resolve(data)
                    })
                })
            }
        }
    }
</script>

<style  scoped lang="scss">
    .zy-btn{
        position: relative;
        border: 0;
        display: inline-block;
        overflow: hidden;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 40rpx;
        z-index: 1;
        box-sizing: border-box;
        transition: all 0.15s;

        &--bold-border {
            border: 1px solid #ffffff;
        }
        &--default {
            color: $zy-content-color;
            border-color: #c0c4cc;
            background-color: #ffffff;
        }
        
        &--primary {
            color: #ffffff;
            border-color: $zy-type-primary;
            background-color: $zy-type-primary;
        }
        
        &--success {
            color: #ffffff;
            border-color: $zy-type-success;
            background-color: $zy-type-success;
        }
        
        &--error {
            color: #ffffff;
            border-color: $zy-type-error;
            background-color: $zy-type-error;
        }
        
        &--warning {
            color: #ffffff;
            border-color: $zy-type-warning;
            background-color: $zy-type-warning;
        }
        
        &--default--disabled {
            color: #ffffff;
            border-color: #e4e7ed;
            background-color: #ffffff;
        }
        
        &--primary--disabled {
            color: #ffffff!important;
            border-color: $zy-type-primary-disabled!important;
            background-color: $zy-type-primary-disabled!important;
        }
        
        &--success--disabled {
            color: #ffffff!important;
            border-color: $zy-type-success-disabled!important;
            background-color: $zy-type-success-disabled!important;
        }
        
        &--error--disabled {
            color: #ffffff!important;
            border-color: $zy-type-error-disabled!important;
            background-color: $zy-type-error-disabled!important;
        }
        
        &--warning--disabled {
            color: #ffffff!important;
            border-color: $zy-type-warning-disabled!important;
            background-color: $zy-type-warning-disabled!important;
        }
	
        
        &--primary--plain {
            color: $zy-type-primary!important;
            border-color: $zy-type-primary-disabled!important;
            background-color: $zy-type-primary-light!important;
        }
        
        &--success--plain {
            color: $zy-type-success!important;
            border-color: $zy-type-success-disabled!important;
            background-color: $zy-type-success-light!important;
        }
        
        &--error--plain {
            color: $zy-type-error!important;
            border-color: $zy-type-error-disabled!important;
            background-color: $zy-type-error-light!important;
        }
        
        &--warning--plain {
            color: $zy-type-warning!important;
            border-color: $zy-type-warning-disabled!important;
            background-color: $zy-type-warning-light!important;
        }

    }

    .zy-hairline-border:after {
        content: ' ';
        position: absolute;
        pointer-events: none;
        // 设置为border-box，意味着下面的scale缩小为0.5，实际上缩小的是伪元素的内容（border-box意味着内容不含border）
        box-sizing: border-box;
        // 中心点作为变形(scale())的原点
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        left: 0;
        top: 0;
        width: 199.8%;
        height: 199.7%;
        -webkit-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        border: 1px solid currentColor;
        z-index: 1;
    }


    .zy-wave-ripple{
       	z-index: 0;
        position: absolute;
        border-radius: 100%;
        background-clip: padding-box;
        pointer-events: none;
        user-select: none;
        transform: scale(0);
        opacity: 1;
        transform-origin: center;
    }

    .zy-wave-ripple.zy-wave-active {
        opacity: 0;
        transform: scale(2);
        transition: opacity 10s linear, transform 4s linear;
    }

    .zy-round-circle {
        border-radius: 100rpx;
    }

    .zy-round-circle::after {
        border-radius: 100rpx;
    }

    .zy-loading::after{
        background-color: hsla(0, 0%, 100%, 0.35);
    }

    .zy-size-default{
        font-size:30rpx;
        height: 80rpx;
        line-height:80rpx;
    }

    .zy-size-medium{
        font-size: 26rpx;
        height: 70rpx;
        line-height: 70rpx;
    }

    .zy-size-mini{
        font-size: 22rpx;
        height:50rpx;
        line-height: 50rpx;
    }
</style>