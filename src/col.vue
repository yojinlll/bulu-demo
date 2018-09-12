<template>
    <div class="col" :class="[`col-${span}`]">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluCol',
        props: {
            span: {
                type: [Number, String]
            }
        }
    }
</script>
<style scoped lang="scss">
    .col {
        height: 100px;
        background: #eeeeee;
        width: 50%;     // 默认不换行 flew-wrap:nowrap
        border: 1px solid red;
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
    }
</style>