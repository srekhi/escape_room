var path = require("path");
module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "./bundle.js"
  },
  module: {
  loaders: [
    {
      test: [/\.js?$/],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ]
},
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
