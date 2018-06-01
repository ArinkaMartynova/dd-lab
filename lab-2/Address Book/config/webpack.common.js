const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    context: path.resolve(__dirname, '../src'),

    entry: {
        app: ['babel-polyfill', './entry']
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ]
}

module.exports = config;