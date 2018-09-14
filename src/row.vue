<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluRow',
        props: {
            gutter: {
                type:[Number, String]
            },
            align:{
                type:String,
                validator(value){
                    return ['left','right','center'].includes(value)

                }
            }
        },
        computed: {
            rowStyle() {
                return {
                    marginLeft: -this.gutter / 2 + 'px',
                    marginRight: -this.gutter / 2 + 'px'
                }
            },
            rowClass(){
                let {align} = this
                return [align && `align-${align}`]
            }
        },
        mounted() {
            this.$children.forEach((vm) => {        // 遍历 row 中 col，将 gutter 传递给 col
                vm.gutter = this.gutter
            })
        }
    }
</script>
<style scoped lang="scss">
    .row {
        display: flex;
        /*flex-wrap: wrap;        // 允许换行，当row的两个col的span值都为24时，就呈现两行*/
        &.align-left{
            justify-content: flex-start;
        }
        &.align-right{
            justify-content: flex-end;
        }
        &.align-center{
            justify-content: center;
        }
    }
</style>