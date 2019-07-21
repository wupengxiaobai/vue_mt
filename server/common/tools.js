/**
 * 随机的6位数字验证码
 */
module.exports = {
    createSixNum: () => Math.random().toString().substring(2, 8),
}