const {
    getMenuData
} = require("../dbs/model/menu")

module.exports = {
    getMenuData: async (ctx) => {
        let menu = await getMenuData()

        if (menu.length) {
            ctx.body = {
                code: 0,
                data: menu,
                msg: '获取菜单数据成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "请求菜单数据出错"
            }
        }
    }
}