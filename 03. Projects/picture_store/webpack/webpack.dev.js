const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../env/.env.development'),
      defaults: false,
      allowEmptyValues: false,
      safe: true
    }),
  ],
};
