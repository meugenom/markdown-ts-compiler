const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
		{
			test: /\.txt$/i,
			use: 'raw-loader',
		},
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
		test:/\.css$/,
		use:[
		MiniCssExtractPlugin.loader,
		"css-loader", "postcss-loader"]}
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: "./src/static/index.html",
    	filename: "./index.html"
	  }),
	  
	  new MiniCssExtractPlugin({
        filename:"style.css",
		chunkFilename: "style.css"
    }),
	new CopyPlugin({
		patterns: [
		  { from: "content/images", to: "images" },
		  { from: "content/thumbnails", to: "thumbnails" },
		],
	  }),

],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  }
};
