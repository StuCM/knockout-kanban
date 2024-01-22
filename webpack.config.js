const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
  const isDevelopment = options.mode === 'development';

  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    devServer: {
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      !isDevelopment && new MiniCssExtractPlugin(),
      isDevelopment && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean)
  };
};