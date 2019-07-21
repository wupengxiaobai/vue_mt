const multer = require('koa-multer'); //加载koa-multer模块
const path = require("path")
//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        // console.log(req.body.target)
        cb(null, path.join(__dirname, '../../static/upload/' + req.body.target))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, req.body.target + '_' + Date.now() + (new String(Math.random())).substring(3, 9) + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({
    storage: storage
});

module.exports = upload