const Koa = require('koa')
const cors = require("@koa/cors")
const static = require('koa-static')
const koaBody = require("koa-body")
const path = require("path");

const {
    port
} = require('./config')
const router = require('./routes')
const app = new Koa()

//指定加载静态资源的根目录,指定所有静态文件的根目录
app.use(static(path.join(__dirname, "static")))
app.use(static(path.join(__dirname, './dist')))

//允许跨域
app.use(cors())

//监听POST请求，将数据存入ctx.request.body中
app.use(koaBody())
//路由挂载
app.use(router.routes());
app.use(router.allowedMethods())

app.listen(port || 9000, () => {
    console.log(`listen in ${ port }...`)
})