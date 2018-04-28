const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
    VueLoaderPlugin
} = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, 'src/index.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                presets: ["latest"]
            }
        }, {
            test: /\.vue$/,
            use: ['vue-loader', 'style-loader', 'css-loader']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                        require('autoprefixer')({
                            browsers: ['last 5 versions']
                        }),
                        require('cssnano')
                    ]
                }
            }]
        }, {
            test: /\.(jpg|png|gif|svg)$/i,
            include: path.resolve(__dirname, './src/assets/images'),
            use: ['url-loader?limit=10000&name=images/[name].[hash:8].[ext]'
            ]
        }]
    },
    plugins: [
        // 清除output文件夹
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ["*", ".js", ".vue"]
    }
}