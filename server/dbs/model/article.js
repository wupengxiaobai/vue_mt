const dbConnect = require('../connect')

module.exports = {
    //  获取文章类
    getArticleTypeData: async (params) => {
        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from article_type_tab`, (error, result, fields) => {
                if (error) {
                    return reject('db select error for article_type_tab', error)
                }
                return resolve(result)
            })
        })

        if (!ret.length) {
            return ""
        }

        return ret
    },
    //  添加文章数据保存
    postArticleData: async (params) => {
        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`insert into article_tab values(null,${params.type},'${params.title}','${params.desc}','${params.content}','${params.createtime}',0,0,'${params.bannerimg}',${new Number(params.top)},1)`, (error, result, fields) => {
                if (error) {
                    return reject('db insert error for article_tab' + error)
                }
                return resolve(result)
            })
        })

        if (!ret.affectedRows) {
            return ""
        }

        return ret.insertId
    },
    //  获取文章列表数据
    getArticleData: async (params) => {
        let where = '2>1',
            limit = '';
        // console.log(params)

        if (params.type == "1" && params.keyword) {
            where = `article_tab.title like '%${params.keyword}%'`
        }

        //  获取生活相关文章条件
        if (params.type == "2" && params.keyword) {
            where = `article_type_tab.name like '%${params.keyword}%'`
        }
        // console.log('where-', where)

        //  获取学习"日积月累"文章相关条件设置
        if (params.type == "3" && params.keyword == "accumulate") {
            where = `article_type_tab.pid = 1 and article_type_tab.id != 7`
        }

        //  获取学习"实战"文章相关条件设置
        if (params.type == "3" && params.keyword == "simpleproject") {
            where = `article_type_tab.pid = 1 and article_type_tab.id = 7`
        }

        if (params.limit && params.currentPage) {
            limit = `limit ${(params.currentPage-1)*params.limit},${params.limit}`
        }
        // console.log('limit-', limit)

        let data = await new Promise((resolve, reject) => {
            dbConnect.query(`
             select article_tab.*,article_type_tab.name
             from article_tab
             left join article_type_tab on article_tab.article_type_id = article_type_tab.id
             where ${where}
             order by article_tab.top desc, article_tab.createtime desc
             ${limit}
             `, (error, result, fields) => {
                if (error) {
                    return reject('db select error for article_tab', error)
                }
                return resolve(result)
            })
        })

        let ret = {}

        ret.data = data

        //  查询总计
        let allcount = await new Promise((resolve, reject) => {
            dbConnect.query(`
             select article_tab.*,article_type_tab.name
             from article_tab
             left join article_type_tab on article_tab.article_type_id = article_type_tab.id
             where ${where} and articlestate = 1
             order by article_tab.top desc, article_tab.createtime desc
             `, (error, result, fields) => {
                if (error) {
                    return reject('db select count error for article_tab', error)
                }
                return resolve(result)
            })
        })

        ret.totalcount = allcount.length

        return ret
    },
    //  删除文章
    deleteArticleById: async (params) => {
        let where = 'id = 999999'
        // console.log('params-- ', params)

        if ((typeof (params.id - 0)) == 'number') {
            where = `id = ${params.id}`
        }

        if (params['id[]'] && (typeof params['id[]']) == 'object') {
            let idsStr = params['id[]'].join(',')
            where = `id in (${idsStr})`
        }

        if (params['id[]'] && (typeof params['id[]']) != 'object' && (typeof (params['id[]'] - 0)) == 'number') {
            where = `id = ${params['id[]'] - 0}`
        }

        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`delete from article_tab where ${where}`, (error, result, fields) => {
                if (error) {
                    return reject('db insert error for article_tab' + error)
                }
                return resolve(result)
            })
        })

        if (!ret.affectedRows) {
            return ""
        }

        return ret.affectedRows
    },
    //  修改文章
    postEditArticleData: async (params) => {
        let ret = await new Promise((resolve, reject) => {
            dbConnect.query(`UPDATE article_tab SET title = '${params.title}', article_type_id = ${params.article_type_id}, createtime = '${params.createtime}', \`desc\` = '${params.desc}', content = '${params.content}', top = ${(params.top-0)}, bannerimg = '${params.bannerimg}', articlestate = ${params.articlestate} WHERE id = ${params.id}`, (error, result, fields) => {
                if (error) {
                    return reject('db update error for article_tab' + error)
                }
                return resolve(result)
            })
        })

        if (!ret.changedRows) {
            return ""
        }
        console.log(ret)

        return ret.changedRows
    }
}