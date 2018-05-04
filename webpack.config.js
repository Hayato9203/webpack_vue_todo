const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
  VueLoaderPlugin
} = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css单独打包出来
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

// 从package.json中获得NODE_ENV
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 根据NODE_ENV确定环境
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  context: path.resolve(__dirname, 'src/'),
  // 下面的设定会导致require is not defined
  // target: 'node',
  // externals: [nodeExternals()],
  output: {
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: './'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      include: [
        path.resolve(__dirname, './src')
      ],
      exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
      )
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      // 解决vue文件中的style lang="less"
      loader: 'vue-style-loader!css-loader!less-loader'
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
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
	//	可以在require()时不添加后缀名
    extensions: ["*", ".js", ".vue", ".less"],
	// 注册别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // 将@注册到路径
      '@': path.resolve(__dirname, 'src')
    }
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
    ),
    config.module.rules.push({
      // 处理stly文件 
      test: /\.styl(us)?$/,
      use: [
        'vue-style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: [
              require('autoprefixer')({
                browsers: ['last 5 versions']
              }),
              require('cssnano')()
            ]
          }
        }, 'stylus-loader'
      ]
    }),
    // dev模式的devServer时需要配置Server的根路径,prod模式使用默认的路径
    config.output.publicPath = '/'
} else {
  config.entry = {
      // 将目标文件生成app: vendor.b32e2908.bundle.js(较大)与app.03c0b604.bundle.js(较小)
      main: [path.resolve(__dirname, 'src/index.js')],
      // 将比较稳定的类库代码单独打包
      vendor: ['vue']
    },
    config.output.filename = '[name].[chunkhash:8].js',
    // 启用类库
    // CommonsChunkPlugin已在webpack 4中删除
    config.optimization = {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            minSize: 1
          }
        }
      },
      // 模块更改会改变文件的hash,重新生成浏览器缓存
      runtimeChunk: 'single'
    },
    config.module.rules.push({
      test: /\.styl(us)?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              minimize: true,
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                }),
                require('cssnano')()
              ]
            }
          },
          'stylus-loader?sourceMap=true'
        ]
      })
    }),
    config.plugins.push(
      // 清除output文件夹
      new CleanWebpackPlugin(['dist']),
      // 让UglifyJS自动删除警告代码块,并清除source-map的waring
      // 这个模块已不需要,production自动,已被移到optimization.minimize中
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          minimize: true,
          compress: {
            warnings: false
          }
        }
      }),
      // 生产环境的css导出
      new ExtractTextPlugin('styles.[hash:8].css'),
    )
}

module.exports = config