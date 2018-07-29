const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');


dotenv.config();

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, '../client'),
  entry: [
    './index.js',
    './index.scss',
  ],
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'js/index.js',
    publicPath: process.env.NODE_ENV === 'production' ? process.env.STATIC_PATH : `http://localhost:${process.env.WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: `${process.env.STATIC_PATH}images`,
            }
          }
        ]
      },
      {
        test: /\.wav$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'sounds/',
            publicPath: `${process.env.STATIC_PATH}sounds`,
          }
        }]
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
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../server/views/index.dev.ejs'),
      inject: false,
    }),
  ],
  devServer: {
    port: process.env.WDS_PORT,
    hot: true,
    historyApiFallback: true
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  const extractTextPlugin = new ExtractTextPlugin({
    filename: 'css/main.css',
    allChunks: true,
  });

  config.plugins.push(extractTextPlugin);
  config.module.rules.push(
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap&importLoaders=3',
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
        'sass-loader?sourceMap',
      ],
    })
  );
} else if (process.env.NODE_ENV === 'development') {
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js',
    './index.scss',
  ];

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader?sourceMap',
      'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap&importLoaders=3',
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
      'sass-loader?sourceMap',
    ],
  });
}

module.exports = config;
