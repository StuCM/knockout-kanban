import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export default (env, options) => {
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