const dbConnect = require('../connect')

module.exports = {
    userLogin: async (params) => {
        const {
            email,
            password
        } = params

        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`
            select users_tab.*, users_info_tab.jurisdiction 
            from users_tab 
            left join users_info_tab on users_tab.id = users_info_tab.user_id
            where email = '${email}' and password='${password}' 
            `, (error, result) => {
                if (error) {
                    return reject('db select error in users_tab', error)
                }
                return resolve(result)
            })
        }).then(res => {
            if (!res.length) {
                return false
            }
            return res[0]
        })

        if (ret) {
            return {
                code: 0,
                msg: "登录成功",
                data: {
                    email: ret.email,
                    jurisdiction: ret.jurisdiction
                }
            }
        }

        return {
            code: -1,
            msg: '登录失败，请确认邮箱和密码的正确性。',
            data: ""
        }
    },
    userRegister: async (params) => {
        const {
            email,
            password
        } = params

        let hasEmal = await new Promise((resolve, reject) => {
            dbConnect.query(`
            select * from users_tab 
            where email = '${email}'
            `, (error, result) => {
                if (error) {
                    return reject('db select error in users_tab', error)
                }
                return resolve(result)
            })
        }).then(res => {
            if (res.length) {
                return false
            }
            return true
        })

        if (!hasEmal) {
            return {
                code: -1,
                msg: "注册失败, 注册邮箱已存在",
                data: ""
            }
        }

        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`
            insert into users_tab
            values(null, '${email}', '${password}')
            `, (error, result) => {
                if (error) {
                    return reject('db insert error in users_tab', error)
                }
                return resolve(result)
            })
        }).then(res => {
            if (!res.length) {
                return false
            }
            return res
        })

        if (ret.changedRows != 0) {
            return {
                code: 0,
                msg: "注册成功",
                data: {
                    email: ret.email,
                    jurisdiction: ret.jurisdiction
                }
            }
        }

        return {
            code: -1,
            msg: '注册失败。',
            data: ""
        }
    }
}