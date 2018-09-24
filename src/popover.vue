<template>
    <div class="popover" @click="onClick" ref="popover">     <!--stop 阻止冒泡给 document (异步)-->
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
             :class="{[`position-${position}`]:true}">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
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
        props: {
            position: {
                type: String,
                default: 'top',
                validate (value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf (value) >= 0
                }
            }
        },
        methods: {
            positionContent () {
                const {contentWrapper, triggerWrapper} = this.$refs         // 析构语法声明变量
                document.body.appendChild (contentWrapper)
                const {width, height, top, left} = triggerWrapper.getBoundingClientRect ()
                const {height: height2} = contentWrapper.getBoundingClientRect ()
                let position = {
                    top: {top: top + window.scrollY, left: left + window.scrollX},
                    bottom: {top: top + height + window.scrollY, left: left + window.scrollX},
                    left: {top: top + window.scrollY + (height - height2) / 2, left: left + window.scrollX},
                    right: {top: top + window.scrollY + (height - height2) / 2, left: left + window.scrollX + width},
                }
                contentWrapper.style.top = position[this.position].top + 'px'
                contentWrapper.style.left = position[this.position].left + 'px'
            },
            onClickDocument (e) {
                if (this.$refs.popover &&
                    (this.$refs.popover === e.Target || this.$refs.popover.contains (e.Target))
                ) {
                    return
                }
                if (this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains (e.target))        // 该节点位置移动过
                ) {
                    return
                }
                this.close ()
            },
            open () {
                this.visible = true

                // nextTick: v-if 为 false 时，这个节点并不存在，所以要用异步，v-if 为 true，节点出现后才进行位置调整
                this.$nextTick (() => {
                    this.positionContent ()
                    document.addEventListener ('click', this.onClickDocument)     // onClickDocument 中的 if 也基于节点来判断
                })
            },

            close () {
                this.visible = false
                document.removeEventListener ('click', this.onClickDocument)
            },
            onClick (event) {
                if (this.$refs.triggerWrapper.contains (event.target)) {
                    if (this.visible === true) {
                        this.close ()
                    } else {
                        this.open ()
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    $border-color: #333;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }

    .content-wrapper {
        position: absolute;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
        background: white;
        padding: .5em 1em;
        max-width: 20em;
        word-break: break-all;

        // position 四个方向的三角形样式
        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0;
            height: 0;
            position: absolute;
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-top-color: black;
                top: 100%;
            }
            &::after {
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            margin-top: 10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-bottom-color: black;
                bottom: 100%;
            }
            &::after {
                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-left-color: black;
                left: 100%;
            }
            &::after {
                border-left-color: white;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-right-color: black;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                right: calc(100% - 1px);
            }
        }
    }
</style>