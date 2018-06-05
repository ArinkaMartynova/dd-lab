const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
    context: path.resolve(__dirname, './src'),

    entry: {
        app: ['babel-polyfill', './index.js']
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },

    module: {
        rules: [

            {
                test: /\.html$/,
                use: 'html-loader'
              }, 

              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
              },
{
              test: /\.s?css$/,
              //use: ExtractTextPlugin.extract({
                //  fallback: 'style-loader',
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
            //  })
          }
            
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),

        new CleanPlugin('dist', {
            root: path.resolve(__dirname, '../'),
            watch: true
        }),
        // new ExtractTextPlugin('app.css')
    ]
}

module.exports = config;