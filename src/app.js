import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)

new Vue({
    el:'#app',
    data:{
        loading1: false,
        loading2: false,
        loading3: false,
    }
})



// 单元测试

import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)

const expect = chai.expect


// 测试1 setting icon
{
    const Constructor = Vue.extend(Button)
    const button = new Constructor({
        propsData:{
            icon:'settings'
        }
    })
    button.$mount()
    console.log(button.$el)
    let useElement = button.$el.querySelector('use')
    let href = useElement.getAttribute('xlink:href')
    expect(href).to.eq('#i-settings')
    button.$el.remove()
    button.$destroy()
}

// 测试2 loading icon
{
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings',
            loading:true               // button.vue（5）有条件限制，true时，只显示loading icon
        }
    })
    vm.$mount()
    let useElement = vm.$el.querySelector('use')
    let href = useElement.getAttribute('xlink:href')
    expect(href).to.eq('#i-loading')
    vm.$el.remove()
    vm.$destroy()
}

// 测试3,4 order（ icon 展示位置）
{
    const div = document.createElement('div')       // order 为样式属性，需要展示样式，则将 button 挂载于 div 中
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings'
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)      // ES6 析构语法
    expect(order).to.eq('1')                        // CSS 中的值皆为str
    vm.$el.remove()                                 // 清理内存
    vm.$destroy()
}
{
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings',
            iconPosition: 'right'
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
}

// 测试5 click
{
    // mock
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings'
        }
    })
    vm.$mount()
    let spy = chai.spy(function () {console.log('mock')})
    vm.$on('click',spy)
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
}