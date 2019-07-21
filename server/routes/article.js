const {
    getArticleData,
    getArticleTypeData,
    postArticleData,
    deleteArticleById,
    postEditArticleData
} = require("../dbs/model/article")

module.exports = {
    //  文章类别标签
    getArticleTypeData: async (ctx) => {
        let articleTypeData = await getArticleTypeData()
        if (articleTypeData.length) {
            ctx.body = {
                code: 0,
                data: articleTypeData,
                msg: '获取文章类别成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "请求文章类别失败"
            }
        }
    },
    //  文章添加
    postArticleData: async (ctx) => {
        let postData = ctx.request.body
        let ret = await postArticleData(postData)

        //  ret 及插入数据成功返回id
        if (ret) {
            ctx.body = {
                code: 0,
                data: {
                    "id": ret
                },
                msg: '添加文章数据保存成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "添加文章保存失败"
            }
        }
    },
    //  文章列表获取
    getArticleData: async (ctx) => {
        let params = ctx.request.query
        let articleData = await getArticleData(params)

        // console.log(articleData)
        if (articleData.data) {
            ctx.body = {
                code: 0,
                data: articleData,
                msg: '获取文章数据成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "请求文章数据失败"
            }
        }
    },
    //  文章删除
    deleteArticleById: async (ctx) => {
        let params = ctx.request.query
        let ret = await deleteArticleById(params)
        //  ret 及删除数据成功返回id
        if (ret) {
            ctx.body = {
                code: 0,
                data: ret,
                msg: '删除文章成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "删除文章失败"
            }
        }
    },
    //  修改文章
    postEditArticleData: async (ctx) => {
        let params = ctx.request.body
        let ret = await postEditArticleData(params)
        if (ret) {
            ctx.body = {
                code: 0,
                data: ret,
                msg: '修改文章成功'
            }
        } else {
            ctx.body = {
                code: -1,
                data: "",
                msg: "修改文章失败"
            }
        }
    }
}