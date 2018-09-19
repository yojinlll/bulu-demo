<template>
    <div class="toast" ref="wrapper">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>
<script>
    export default {
        name: 'BuluToast',
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: Number,
                default: 50
            },
            closeButton: {
                type: Object,
                default: () => {
                    return {
                        text: '关闭', callback: undefined
                    }
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            }
        },
        created () {
            console.log (this.closeButton)
        },
        mounted () {
            this.execAutoClose ()
            this.updateStyles ()

        },
        /*
        this.$refs.line.style.height = this.$refs.wrapper.style.height
        目标：用JS控制line为响应高度，但无法用该语法获取style样式
         */
        methods: {
            updateStyles () {
                this.$nextTick (() => {
                    console.log (this.$refs.wrapper.getBoundingClientRect ())
                    this.$refs.line.style.height =
                        `${this.$refs.wrapper.getBoundingClientRect ().height}px`
                })
            },
            execAutoClose () {
                if (this.autoClose) {
                    setTimeout (() => {
                        this.close ()
                    }, this.autoCloseDelay * 1000)
                }
            },
            close () {
                this.$el.remove ()
                this.$destroy ()
            },
            onClickClose () {
                this.close ()
                if (this.closeButton && typeof(this.closeButton === 'function')) {
                    this.closeButton.callback ()
                }
            }
        }

    }

</script>
<style lang="scss" scoped>
    $font-size: 14px;
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size; min-height: $toast-min-height; line-height: 1.8;
        position: fixed; top: 10px; left: 50%; transform: translateX(-50%);
        background: $toast-bg; padding: 0 16px;
        align-items: center; display: flex;
        border-radius: 4px; box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        color: white;
        .message{
            padding: 8px 0;
        }
        .close {
            padding-left: 16px;
            flex-shrink: 0;
        }
        .line {
            height: 100%;
            border-left: 1px solid #666;
            margin-left: 16px;
        }
    }
</style>