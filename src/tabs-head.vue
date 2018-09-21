<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="actions-wrapper">
            <slot name="actions"></slot>   <!--name 用于关联 index 中的 template & slot，双插槽 -->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'BuluTabsHead',
        inject:['eventBus'],
        created(){

        }
    }
</script>
<style lang="scss" scoped>
    $tab-height: 40px;
    .tabs-head {
        display: flex;
        height: $tab-height;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid red;
        > .actions-wrapper {
            margin-left: auto;
        }
    }
</style>