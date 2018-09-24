<template>
    <div class="popover" @click="onClick" ref="popover">     <!--stop 阻止冒泡给 document (异步)-->
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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