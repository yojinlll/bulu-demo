<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: 'BuluTabs',
        props: {
            selected: {
                type: String,
                required: true,
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator (value) {
                    return ['horizontal', 'vertical'].indexOf (value) >= 0
                }
            }
        },
        data () {
            return {
                eventBus: new Vue ()
            }
        },
        provide () {
            return {
                eventBus: this.eventBus
            }
        },
        mounted () {
            // 遍历tabs，找到 BuluTabsHead ，再找到 BuluTabsItem，再执行 if
            this.$children.forEach((vm)=>{
                if(vm.$options.name === 'BuluTabsHead'){
                    vm.$children.forEach((childVm)=>{
                        if(childVm.$options.name === 'BuluTabsItem' && childVm.name === this.selected){
                            console.log (childVm)
                            console.log (childVm.$el)
                            console.log (childVm.name)
                            this.eventBus.$emit('update:selected',this.selected,childVm)
                        }
                    })
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {
    }
</style>