import Vue from 'vue'

import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

import Input from './input'

import Row from './row'
import Col from './col'
import Layout from './layout'
import Sider from './sider'
import Header from './header'
import Content from './content'
import Footer from './footer'

import Toast from './toast'
import plugin from './plugin'

import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'

import Popover from './popover'

import Collapse from './collapse'
import CollapseItem from './collapse-item'


Vue.component ('g-button', Button)
Vue.component ('g-icon', Icon)
Vue.component ('g-button-group', ButtonGroup)
Vue.component ('g-input', Input)
Vue.component ('g-row', Row)
Vue.component ('g-col', Col)
Vue.component ('g-layout', Layout)
Vue.component ('g-sider', Sider)
Vue.component ('g-header', Header)
Vue.component ('g-content', Content)
Vue.component ('g-footer', Footer)
Vue.component ('g-toast', Toast)
Vue.use (plugin)
Vue.component ('g-tabs', Tabs)
Vue.component ('g-tabs-head', TabsHead)
Vue.component ('g-tabs-body', TabsBody)
Vue.component ('g-tabs-item', TabsItem)
Vue.component ('g-tabs-pane', TabsPane)
Vue.component ('g-popover', Popover)
Vue.component ('g-collapse', Collapse)
Vue.component ('g-collapse-item', CollapseItem)

new Vue ({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false,
        message: 'v-model',
        selectedTab: 'sports',
    },
    created () {
    },
    methods: {
        showToast1 () {
            this.showToast ('top')
        },
        showToast2 () {
            this.showToast ('middle')
        },
        showToast3 () {
            this.showToast ('bottom')
        },
        showToast (position) {
            this.$toast (`恭喜你获得了${parseInt (Math.random () * 10000)}奖金`, {
                position: position,
                enableHtml: true,
                autoClose: 3,
                closeButton: {
                    text: '点击关闭',
                    callback () {
                        console.log ("用户说他知道了")
                    }
                }
            })
        },
        yyy(){
            console.log ('yyy')
        }
    }
})
