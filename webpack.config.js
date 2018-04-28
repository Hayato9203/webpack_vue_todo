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
        filename: '[name].[hash].js',
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
            use: ['style-loader', 'css-loader', {
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
            use: ['url-loader?limit=10000&name=images/[name].[hash:8].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 50
                        },
                        optipng: {
                            enabled: true,
                            optimizationLevel: 3
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                            optimizationLevel: 2
                        },
                        webp: {
                            quality: 75
                        }
                    }
                }
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