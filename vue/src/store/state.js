export default {
    get UserToken() {
        return JSON.parse(localStorage.getItem('token'))
    },
    set UserToken(value) {
        value = JSON.stringify(value)
        localStorage.setItem('token', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: [],
}


// state:每个页面重新初始化
//localStolorage:保存在本地

