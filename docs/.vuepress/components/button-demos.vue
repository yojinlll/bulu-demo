<template>
    <div>
        <g-button icon="left">默认按钮</g-button>
        <g-button icon="settings" :loading="buttonToggle" @click="buttonToggle = !buttonToggle">点击切换</g-button>
        <g-button icon="right" icon-position="right">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>
<script>
    import Button from '../../../src/button'

    export default {
        components: {
            'g-button': Button
        },
        data () {
            return {
                buttonToggle: false,
                content:`
    <g-button icon="left">默认按钮</g-button>
    <g-button icon="settings" :loading="buttonToggle" @click="buttonToggle = !buttonToggle">点击切换</g-button>
    <g-button icon="right" icon-position="right">默认按钮</g-button>
    <g-button disabled>默认按钮</g-button>
                `
            }
        }
    }
</script>