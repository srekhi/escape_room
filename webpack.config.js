module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: "./",
    filename: "bundle.js"
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
    extensions: [".js", ""]
  }
};
