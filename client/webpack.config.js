var webpack = require('webpack');

module.exports = {
  entry: [
    './src/app.js'
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
