
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    devServer: {
        host: 'localhost',
        port: 8090,
        https: false,
        disableHostCheck: true
    },
    //修复HMR(热更新)失效
    chainWebpack: (config) => {
       config.resolve.symlinks(true);
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
        } else {
            config.mode = 'development'
        }
    },
    css: {
        extract: true,
        loaderOptions: {
            sass: {
                data:`@import "@/assets/scss/variables.scss";`
            }
        }
    },
    productionSourceMap: false,
    lintOnSave:false
}