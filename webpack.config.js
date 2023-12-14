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
  target: ['web', 'es5'],
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
        test: /\.[jt]s?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, './tsconfig.json'),
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
		  { from: "./src/content/images", to: "images" },
		  { from: "./src/content/thumbnails", to: "thumbnails" },
		],
	  }),
    
],
  devServer: {    
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8083,
  }
};
