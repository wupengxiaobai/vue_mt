const dbConnect = require('../connect')

/**
 * 无限极分类函数实现一
 */
let son = []; //    定义存储变量
function treeMenu(data, id = 0, lev = 0) {
    for (var val of data) {
        if (val['pid'] == id) { //  判断父级id=和当前id
            val['lev'] = lev; //    标识值，几级菜单
            son.push(val); //   如果pid=id，保存到son数组中
            treeMenu(data, val['id'], lev + 1); //  如果是下级菜单，回调继续
        }
    }
    return son;
}


module.exports = {
    //  获取菜单数据
    getMenuData: async () => {
        son = [];
        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from menu_tab`, (error, result, fields) => {
                if (error) {
                    return reject('db select error for menu_tab', error)
                }
                // return resolve(treeMenu(result))
                return resolve(result)
            })
        })

        if (!ret.length) {
            return ""
        }

        return ret
    }
}