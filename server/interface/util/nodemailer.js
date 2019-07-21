//  邮件服务接口
const nodemailer = require('nodemailer')

const config = {
    host: 'smtp.163.com',
    port: 465,
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: 'mengbaohenkeai@163.com',
        pass: 'woaita12345'
    }
}

const mailTransport = nodemailer.createTransport(config);

//  发送邮件
module.exports = function (main) {
    mailTransport.sendMail(main, function (err, info) {
        if (err) {
            return console.log('发送邮件失败：', err);
        }
        console.log('邮件发送成功: ', info.response);
    });
}