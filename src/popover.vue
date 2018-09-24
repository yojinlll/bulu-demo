<template>
    <div class="popover" @click="onClick" ref="popover">     <!--stop 阻止冒泡给 document (异步)-->
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
        methods: {

            positionContent(){
                document.body.appendChild(this.$refs.contentWrapper)
                let {width,height,top,left} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
            },

            onClickDocument(e){
                if(this.$refs.popover &&
                    (this.$refs.popover === e.Target || this.$refs.popover.contains(e.Target))
                ) { return }
                if(this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))        // 该节点位置移动过
                ){ return }
                this.close()
            },
            open(){
                this.visible = true

                // nextTick: v-if 为 false 时，这个节点并不存在，所以要用异步，v-if 为 true，节点出现后才进行位置调整
                this.$nextTick(()=>{
                    this.positionContent()
                    document.addEventListener('click',this.onClickDocument)     // onClickDocument 中的 if 也基于节点来判断
                })
            },

            close(){
                this.visible = false
                document.removeEventListener('click',this.onClickDocument)
            },
            onClick(event){
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visible === true){
                        this.close()
                    }else{
                        this.open()
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
        filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));
        background: white;
        transform: translateY(-100%);

        margin-top: -10px;
        padding: .5em 1em;
        max-width: 20em;
        word-break: break-all;

        // 小三角样式
        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0;
            height: 0;
            position: absolute;
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
</style>