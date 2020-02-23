
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

// copy files from /src to /dist
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill',
    './src/scripts/index.js',
    './src/scss/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            interpolate: true,
            minimize: true
          }
        }]
      },
      {
        test: /\.md$/i,
        use: 'raw-loader'
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'webpack html to dist',
        template: './src/index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      }
    ),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: './content/posts/images',
        to: './images'
      },
      {
        from: './content/posts/thumbnails',
        to: './thumbnails'
      }
    ])
  ]
}
