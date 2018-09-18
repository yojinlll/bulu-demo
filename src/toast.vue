<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluToast'
    }

</script>
<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0,0,0,0.75);
    .toast {
        font-size: $font-size;          line-height: 1.8;
        height: $toast-height;          padding: 0 16px;
        position: fixed;                top: 0; left: 50%;
        align-items: center;            display: flex;
        transform: translateX(-50%);    background: $toast-bg;
        border-radius: 4px;             box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
        color: white;
    }

</style>