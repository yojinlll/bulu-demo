<template>
    <div class="tabs-item" @click="xxx">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluTabsItem',
        inject:['eventBus'],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name:{
                type:String|Number,
                required:true
            }
        },
        created(){
            // console.log ('Tabs给item')
            // console.log (this.eventBus)
            // console.log (this)
            this.eventBus.$on('update:selected',(name)=>{
                console.log(name)
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item {
    }
</style>