const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/morpher.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'morpher.min.js',
    library: 'Morpher',
    libraryTarget: 'var',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: (file) => {
          const {map, code} = require('uglify-js').minify(file);
          return {map, code};
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      }],
  },
};