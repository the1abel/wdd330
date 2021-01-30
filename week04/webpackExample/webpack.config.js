/* NOTE: Webpack minifies by default when `mode` is set to 'production',
 *       so the Babili plugin is unnecessary
 */
//const webpack = require('webpack');
//const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  context: __dirname + '/src',
  entry: './js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // presets: ['env'] // this is for Babel v6.x
          presets: ['@babel/preset-env'] // this is for Babel v7.x
        }
      }
    }]
  },
  // plugins: [
  //  new BabiliPlugin(),
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   })
  // ],
  mode: 'development', // or 'production'
};