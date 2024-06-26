const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../env/.env.production'),
      defaults: false,
      allowEmptyValues: false,
      safe: true
    }),
  ],
};
