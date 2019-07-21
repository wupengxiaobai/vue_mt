module.exports = {
    getBaseData: async (ctx) => {
        ctx.body = {
            code: 0,
            data: {
                "name": "basename",
                "age": "baseage",
                "gender": "basegender"
            }
        }
    }
}