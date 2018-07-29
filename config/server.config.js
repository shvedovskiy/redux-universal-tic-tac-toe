const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv');


dotenv.config();

module.exports = {
  mode: 'production',
  context: path.join(__dirname, '../server'),
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '../server/bin'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
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
        use: [
          {
            loader: 'css-loader/locals',
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
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            emitFile: false,
          },
        }],
      },
      {
        test: /\.wav$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'sounds/[name].[ext]',
            emitFile: false,
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
  ],
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
};
