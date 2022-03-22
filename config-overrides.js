const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (config) => {
  config.resolve.plugins.push(new TsconfigPathsPlugin());
  config.plugins.push(new webpack.EnvironmentPlugin(['TEST']));

  return config;
};
