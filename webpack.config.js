var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  entry: `${SRC_DIR}/main.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css/,
        include: SRC_DIR,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};