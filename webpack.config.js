/* global __dirname, require, module */
'use strict'

const webpack = require('webpack')
const path = require('path')
const WrapperPlugin = require('wrapper-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

let libraryName = 'Deviz'
let plugins = []
let outputFile

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({minimize: true, sourceMap: true}))
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }));
  plugins.push( new webpack.LoaderOptionsPlugin({
    minimize: true
  }));

  outputFile = libraryName.toLowerCase() + '.min.js'
} else {
  outputFile = libraryName.toLowerCase() + '.js'
}

const config = {
  entry: path.join(__dirname, '/src/main.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        // standard-loader as a preloader
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          error: false,
          snazzy: true,
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'assets/'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: plugins,
  externals: {
    vue: 'Vue'
  }
}

module.exports = config