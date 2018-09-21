<template>
    <div class="tabs-pane">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluTabsPane',
        inject:['eventBus'],
        created(){
            this.eventBus.$on('update:selected',()=>{
                console.log (1)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-pane{
        
    }
</style>