<template>
    <div id="popover" class="popover" @click.stop="xxx">     <!--stop 阻止冒泡给 document (异步)-->
        <div ref="contentWrapper" class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "BuluPopover",
        data () {
            return {visible: false}
        },
        methods: {
            xxx () {
                this.visible = !this.visible                // 单独点击 <.popover> (包含button)，可触发 content 展示与关闭

                if (this.visible === true) {                // 令点击 document 可以关闭 content
                    this.$nextTick (() => {                 // 异步

                        document.body.appendChild (this.$refs.contentWrapper)       // 避免与 overflow hidden 冲突
                        let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect ()
                        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'

                        let eventHandler = () => {
                            this.visible = false
                            console.log ('document 隐藏 popover')
                            document.removeEventListener ('click', eventHandler)
                            // 不移除，则 addEverListener 会一直叠加，且不用 bind 绑定 this，那样等于一个新的函数，移除无效
                        }
                        document.addEventListener ('click', eventHandler)            // 不监听body，因为body有区域范围
                    })
                } else {
                    console.log ('vm 隐藏 popover')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }

    .content-wrapper {
        position: absolute;
        border: 1px solid red;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        transform: translateY(-100%);
    }
</style>