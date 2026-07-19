const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // Entry point
  entry: "./src/demo.ts",
  output: {
    filename: "[name].js",
    // dist-demo for html demo
    path: path.resolve(__dirname, "dist-demo"),
    chunkFilename: "[name].[contenthash].chunk.js",    
  },
  mode: "production",
  performance: {
    hints: false, 
  },
  devtool: "source-map",
  target: "web",

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0, 
      maxInitialRequests: Infinity,
      cacheGroups: {        
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.[jt]s?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/static/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].chunk.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/content/images", to: "./images" },
        { from: "./src/content/thumbnails", to: "./thumbnails" },
      ],
    }),
  ],
};