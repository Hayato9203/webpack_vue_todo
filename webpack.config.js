const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
  VueLoaderPlugin
} = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 从package.json中获得NODE_ENV
const isDev = process.env.NODE_ENV === 'development'

const config = {
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin({}),
    // 清除output文件夹
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ["*", ".js", ".vue"]
  }
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
    }
  }
}

module.exports = config