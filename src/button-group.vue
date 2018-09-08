<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        mounted(){
            for(let node of this.$el.children){
                console.log(node.nodeName)
                let name = node.nodeName.toLowerCase()
                if(name !== 'button'){
                    console.warn(`g-button-group 的子元素应该全是 g-button，但你写的是 ${name}`)
                }
            }
        }
    }
</script>
<style lang="scss">
    .g-button-group{
        display: inline-flex;
        vertical-align: middle;
        > .g-button{
            border-radius: 0;

             /* 消除边框叠层bug */
            margin-left: -1px;
            &:hover{
                position: relative;
                z-index: 1;
            }

            &:first-child{
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }
            &:last-child{
                border-top-right-radius: var(--border-radius);
                border-bottom-right-radius: var(--border-radius);
            }
        }
    }
</style>