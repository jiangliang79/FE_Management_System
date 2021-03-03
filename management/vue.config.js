module.exports = {
    devServer: {
         port: 8081, // 前端
        proxy: {
            "/api": {
                target: "http://localhost:8080" // 后端
            }
        }
    },

    lintOnSave: false
}