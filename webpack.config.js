const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
  VueLoaderPlugin
} = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

// 从package.json中获得NODE_ENV
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 根据NODE_ENV确定环境
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  // 下面的设定会导致require is not defined
  // target: 'node',
  // externals: [nodeExternals()],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      include: [
        path.resolve(__dirname, './src')
      ],
      options: {
        presets: ["latest"]
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['vue-style-loader', {
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
          ],
          sourceMap: true
        }
      }]
    }, {
      test: /\.(jpg|png|gif|svg)$/i,
      include: path.resolve(__dirname, './src/assets/images'),
      use: ['url-loader?limit=8196&name=images/[name].[hash:8].[ext]',
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
    // 请记住，设置NODE_ENV不会自动设置模式
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: isDev ? '"development"' : '"production"'
    //   }
    // }),    
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ["*", ".js", ".vue"]
  },
  devtool: 'eval-source-map'
}

if (isDev) {
  config.devServer = {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      // 错误显示到网页
      overlay: {
        warnings: true,
        errors: true
      },
      hot: true
    },
    config.plugins.push(
      // HMR不应该用在production模式.
      new webpack.HotModuleReplacementPlugin(),
      // 减少不需要的信息展示
      new webpack.NoEmitOnErrorsPlugin()
    )
} else {
  config.plugins.push(
    // 清除output文件夹
    new CleanWebpackPlugin(['dist']),
    // 让UglifyJS自动删除警告代码块,并清除source-map的waring
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        minimize: true,
        compress: {
          warnings: false
        }
      }
    })
  )
}

module.exports = config