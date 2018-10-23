const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugiun = require('clean-webpack-plugin');

const outputDir = 'dist';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|ttf|svg|jpg|gif)$/i,
        use: [
          {
          loader: 'url-loader',
          options: { limit: 8192 }
          }
       ]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebPackPlugiun([outputDir]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png'
    })
  ]
};