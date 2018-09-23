<template>
    <div id="popover" class="popover" @click.stop="xxx">     <!--stop 阻止冒泡给 document (异步)-->
        <div class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
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
                console.log (this.visible)

                this.visible = !this.visible                // 单独点击 <.popover> (包含button)，可触发 content 展示与关闭
                console.log (this.visible, 'visible 切换')

                if (this.visible === true) {                // 令点击 document 可以关闭 content
                    this.$nextTick (() => {                 // 异步
                        let eventHandler = () => {
                            this.visible = false
                            console.log ('document 隐藏 popover')
                            document.removeEventListener ('click', eventHandler)     // 不移除，则 addEverListener 会一直叠加
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
        .content-wrapper {
            position: absolute;
            bottom: 100%;
            left: 0;
            border: 1px solid red;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }
    }
</style>