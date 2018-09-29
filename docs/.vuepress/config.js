module.exports = {
    base: '/bulu-demo/',
    title: 'Bulu',
    description: '用 Vue 实现的小组件',
    themeConfig: {
        nav: [
            {text: '交流', link: 'https://github.com/yojinlll'},
        ],
        sidebar: [
            '/start/',
            {
                title: '组件',
                children: [
                    '/components/button',
                    '/components/input',
                    '/components/grid',
                    '/components/layout',
                    '/components/tabs',
                    '/components/popover',
                    '/components/toast'
                ]
            }
        ],
    }
}