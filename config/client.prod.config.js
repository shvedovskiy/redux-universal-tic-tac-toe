const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');


dotenv.config();

module.exports = {
  mode: 'production',
  context: path.join(__dirname, '../client'),
  entry: [
    './index.js',
    './index.scss',
  ],
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'js/index.js',
    publicPath: process.env.STATIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                sourceMap: true,
                importLoaders: 3,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'config/postcss.config.js',
                },
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            publicPath: `${process.env.STATIC_PATH}images/`,
          },
        }],
      },
      {
        test: /\.wav$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'sounds/[name].[ext]',
            publicPath: `${process.env.STATIC_PATH}sounds/`,
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'STATIC_PATH': JSON.stringify(process.env.STATIC_PATH),
        'SERVER_HOSTNAME': JSON.stringify(process.env.SERVER_HOSTNAME),
        'SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
        'HTTPS': JSON.stringify(process.env.HTTPS),
        'NOW': JSON.stringify(process.env.NOW),
        'NOW_URL': JSON.stringify(process.env.NOW_URL),
      },
    }),
    new ExtractTextPlugin({
      filename: 'css/main.css',
      allChunks: true,
    }),
  ],
};
