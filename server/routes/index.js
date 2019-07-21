const Router = require('koa-router');
const router = new Router();
const menu = require("./menu");
const users = require('./users')
const article = require('./article')
const upload = require('../common/util/upload.js')

//  获取菜单数据
router.get("/getMenuData", menu.getMenuData)

//  用户操作
router.post('/users/login', users.login)
router.post('/users/register', users.register)

//  文章相关列表
router.get("/getArticleTypeData", article.getArticleTypeData)
router.get("/getArticleData", article.getArticleData)
router.post("/postArticleData", article.postArticleData)
router.get("/deleteArticleData", article.deleteArticleById)
router.post("/postEditArticleData", article.postEditArticleData)

//  文章图片上传服务器/
router.post('/uploadArticleBannerImg', upload.single('file'), async (ctx) => {
    ctx.body = {
        filename: '/static/upload/article/' + ctx.req.file.filename //返回文件名
    }
});

module.exports = router