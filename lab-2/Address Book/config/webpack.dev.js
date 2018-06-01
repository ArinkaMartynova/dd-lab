const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const autoprefixer = require('autoprefixer')

const config = merge(commonConfig, {
    devtool: 'eval',

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

            // В dev сборке извлекать стили в отдельный файл не нужно
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
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
            },
        ]

    }
});

module.exports = config;