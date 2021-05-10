/* Copyright Coder Technologies Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const src = path.resolve(__dirname, "src/client")
const build = path.resolve(__dirname, "dist/client")

// Client config
module.exports = {
  name: "client",
  target: "web",
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: path.join(src, "index.tsx"),
  output: {
    path: build,
    filename: "[name].[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, "index.html"),
      inject: true,
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    stats: "errors-only",
  },
}
