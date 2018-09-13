<template>
    <div class="col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluCol',
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            }
        },
        data() {                // create
            return {
                gutter: 0,
            }
        },
        computed: {             // mounted，gutter变了，colStyle也变
            colClass() {
                // let {span,offset} = this
                let span = this.span
                let offset = this.offset
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`
                ]
            },
            colStyle() {
                return {
                    paddingLeft: this.gutter / 2 + 'px',
                    paddingRight: this.gutter / 2 + 'px'
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .col {
        /*background: #eeeeee;*/
        /*width: 50%; // 默认不换行 flew-wrap:nowrap*/
        /*border: 1px solid red;*/
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
</style>