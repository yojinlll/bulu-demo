<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}"
        @click="$emit('click')">
        <!--    组件化：    index { g-button { g-icon } }   -->
        <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>     <!--name 绑定 icon.vue 的props-->
        <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>
<script>
    // 方法一：导入 icon 组件，避免测试错误
    import Vue from 'vue'
    import Icon from './icon'
    Vue.component('g-icon', Icon)

    export default {
        /*
        方法二：更方便的引入 （ 注意要 components )
        components:{
            'g-icon':Icon
        },
        */

        name:'BuluButton',

        props:{
            icon:{},
            loading:{
                type:Boolean,
                default:false
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value) {
                    return value === 'left' || value === 'right'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "var";
    @keyframes spin {
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }
    .g-button{
        font-size: $font-size;
        height: $button-height;
        padding: 0 1em;
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        display: inline-flex; justify-content: center; align-items: center;
        vertical-align: middle;
        &:hover{ border-color: $border-color-hover; }
        &:active{ background-color: $button-active-bg; }
        &:focus{ outline:none; }

        /*css控制svg样式*/
        > .content{ order: 2; }
        > .icon{ order: 1; margin-right: .1em; }
        &.icon-right{
            > .content{ order: 1; }
            > .icon{ order: 2; margin-right: 0; margin-left: .1em; }
        }

        .loading{ animation: spin 1s infinite linear; }
    }
</style>