const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode === 'development';

  const config = {
    entry: {
      main: './src/js/index.js',
      // vendors: ['./src/js/vendors/vendors.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[chunkhash].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common'
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
          }
        })
      ]
    },
    devServer: {
      contentBase: './dist',
      open: true,
      compress: true,
      port: 9000,
      overlay: true,
      stats: 'minimal'
    },
    devtool: devMode
      ? 'eval-sourcemap'
      : false,
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
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            {
              loader: 'css-loader',
              options: {
                minimize: devMode 
                  ? false
                  : {discardComments: {removeAll: true}}
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    mode: options.mode
                  }
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /fonts/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: path.resolve(__dirname, "src/"),
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: devMode 
                  ? true 
                  : false,
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /img/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/'
            }
          }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contenthash].css',
        chunkFilename: 'css/common.[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new WebpackMd5Hash()
    ]
  };

  return config;
};
