<template>
    <div class="tabs-item" @click="onClick" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BuluTabsItem',
        inject: ['eventBus'],
        data () {
            return {
                active: false
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String | Number,
                required: true
            }
        },
        computed: {
            classes () {
                return {
                    active: this.active,
                    disabled: this.disabled
                }
            }
        },
        created () {
            // console.log (this.eventBus)
            // console.log (this)
            this.eventBus.$on ('update:selected', (name) => {
                // this.active = name === this.name ? true : false
                if (name === this.name) {
                    this.active = true
                } else {
                    this.active = false
                }
            })
        },
        methods: {
            onClick () {
                if(this.disabled){ return }
                this.eventBus.$emit ('update:selected', this.name,this)
            }
        }
    }
</script>
<style lang="scss" scoped>
    $blue: blue;
    $disabled-text-color: #ccc;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 1em;
        cursor:pointer;
        height:100%;
        display: flex;
        align-items: center;
        &.active {
            font-weight: bold;
            color:$blue;
        }
        &.disabled {
            color: $disabled-text-color;
            cursor: not-allowed;
        }
    }
</style>