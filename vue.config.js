const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 9000
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack(config) {
        config.resolve.alias
            .set('api', resolve('src/api'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
    },
}