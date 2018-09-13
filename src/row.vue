<template>
    <div class="row" :style="rowStyle">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluRow',
        props: {
            gutter: [Number, String]
        },
        computed: {
            rowStyle() {
                return {
                    marginLeft: -this.gutter / 2 + 'px',
                    marginRight: -this.gutter / 2 + 'px'
                }
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
    }
</style>