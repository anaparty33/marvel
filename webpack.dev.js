const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const config = require("./src/config/development.json");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        //This rule converts all .scss files to the .css. This convertion is required because browers can only understand css so all the scss code must be converted to the browser understandble css code.
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        //This rule is used to import images and fonts in the .scss files
        test: /\.(otf|woff|woff2|eot|ttf|svg|gif|jpe?g|png)$/,
        loader: "url-loader?limit=9000",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: "public",
      },
    ]),
    new webpack.DefinePlugin({
      config: JSON.stringify(config),
    }),
  ],
});
