module.exports = {
  context: __dirname + '/src',
  entry: './mainTodo.js',
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
          presets: ['@babel/preset-env'] // for Babel v7.x. OR ['env'] for Babel v6.x
        }
      }
    }]
  },
  mode: 'production', // or 'development' (minifies by default in production mode)
};