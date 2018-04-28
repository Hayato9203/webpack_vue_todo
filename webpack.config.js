const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: 'bundle.js',
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
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ["*", ".js", ".vue"]
    }
}