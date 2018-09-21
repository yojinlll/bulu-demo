<template>
    <div class="tabs-item" @click="xxx" :class="classes">
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
                    active: this.active
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
            xxx () {
                this.eventBus.$emit ('update:selected', this.name)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item {
        flex-shrink: 0;
        padding: 0 1em;
        cursor:pointer;
        height:100%;
        display: flex;
        align-items: center;
        border: 1px solid green;
        &.active {
            background: red;
        }
    }
</style>