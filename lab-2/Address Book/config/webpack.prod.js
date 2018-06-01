const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const webpack = require('webpack')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanPlugin = require('clean-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const config = merge(commonConfig, {
    module: {
        rules: [
            {
                test: (filename) => filename.endsWith('.js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'env', 'stage-2' ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ]
                            }
                        },
                        'sass-loader',
                    ]
                })
            },
        ]
    },

    plugins: [
        
        // Отделяем вендорные библиотеки в отдельный чанк
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/gi.test(resource)
        }),

        // Вытаскиваем код webpack'a в отдельный чанк
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),

        // Минифицируем js
        new UglifyJSWebpackPlugin({
            sourceMap: false // Генерация SourceMap для минифицированных файлов
        }),

        new CleanPlugin('dist', {
            root: path.resolve(__dirname, '../'),
            watch: true
        }),

        new ExtractTextPlugin('[name].css'),


        // new BundleAnalyzer()
    ]
});

module.exports = config;