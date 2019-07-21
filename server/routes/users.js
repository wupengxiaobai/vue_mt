const {
    userLogin,
    userRegister
} = require("../dbs/model/users")

module.exports = {
    register: async (ctx) => {
        const {
            email,
            password
        } = ctx.request.body

        let ret = await userRegister({
            email,
            password
        })

        ctx.body = {
            code: ret.code,
            msg: ret.msg,
            data: ret.data
        }
    },

    //  用户登录
    login: async (ctx) => {
        const {
            email,
            password
        } = ctx.request.body

        let ret = await userLogin({
            email,
            password
        })

        ctx.body = {
            code: ret.code,
            msg: ret.msg,
            data: ret.data
        }
    },
    keepLogin: (ctx) => {

    }
}