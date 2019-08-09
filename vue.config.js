
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const broserList=[
    "> 1%",
    "last 10 versions",
    "not ie <= 8"
];
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    //修复HMR(热更新)失效
    chainWebpack: (config) => {
       config.resolve.symlinks(true);
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // let optimization = {
            //     splitChunks: {
            //         chunks: 'all',//在做代码分割时,只对异步代码生效,写成all的话,同步异步代码都会分割
            //         minSize: 20000, // 依赖包超过20kb才做代码分割
            //         maxAsyncRequests: 5,//同时加载的模块最多是5个
            //         maxInitialRequests: 3, //入口文件做代码分割最多分成3个js
            //         name: true,//让cacheGroups里面的名字生效
            //         automaticNameDelimiter: '~',//文件生成时的连接符
            //         cacheGroups: {//当打包同步代码时,上面的参数生效
            //             vendors: {
            //                 test: /[\\/]node_modules[\\/]/,//检测引入的库是否在node_modules里
            //                 priority: -10,//值越大,优先级越高,莫乱先打包到优先级高的组里
            //                 filename:'vendors.js'//所有的库都打包到vendor.js这个文件里
            //             },
            //             default: {
            //                 minChunks: 2,//当一个包至少被用了多少次才进行代码分割
            //                 priority: -20,
            //                 reuseExistingChunk: true,//如果一个模块被打包过了,再次打包就会忽略
            //                 filename:'common.js'
            //             }
            //         }
            //     }
            // }
            // Object.assign(config, {
            //     optimization
            // })
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new BundleAnalyzerPlugin()
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
            // return {
            //     plugins: [
            //         new BundleAnalyzerPlugin()
            //     ]
            // }
        }
    },
    css: {
        extract: true,
        loaderOptions: {
            sass: {
                data:`@import "@/assets/scss/variables.scss";`
            },
            postcss: {
                plugins: [
                    require('autoprefixer')
                ]
            }
        }
    },
    productionSourceMap: false,
    lintOnSave:false,
    devServer: {
        host: 'localhost',
        port: 8090,
        https: false,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8090',
                    changeOrigin: true,
                    pathRewrite: {
                    '^/api': '/test'
                }
            }
        }
    }
}