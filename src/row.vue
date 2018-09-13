<template>
    <div class="row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluRow',
        props: {
            gutter: [Number, String]
        },
        // created () {
        //     console.log('row created')
        // },
        mounted () {
            // console.log('row mounted')
            // console.log(this.$children)
            this.$children.forEach((vm) => {        // 遍历 row 的所有 children，并将 gutter 传递过去
                vm.gutter = this.gutter
            })
        }
    }

    var div = document.createElement('div') // created
    var childDiv = document.createElement('div') // child created
    div.appendChild(childDiv) // child mounted
    document.body.appendChild(div) // mounted
</script>
<style scoped lang="scss">
    .row {
        display: flex;
    }
</style>