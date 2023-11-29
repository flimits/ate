//Deferred prompt

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// Add plugins to the webpack configuration. InjectManifest, HtmlWebpackPlugin, pwaManifest
// TODO: Add CSS loaders and babel to webpack.
// Add rules to the webpack configuration. css-loader, babel-loader, style-loader 
// make sure to add the plugins and rules to the correct configuration object. 
// 10 properties: 1) Name, 2) short name, 3) start_url, 4) background color, 5)theme color, 6) icons, 7) description, 8) publicPath, 9) inject, 10) fingerprints,

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "./favicon.ico",
        template: './index.html',
        title: 'Another Text Editor',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Another Text Editor',
        short_name: 'ATE',
        description: 'Edit A Text Document In Browswer',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        }],
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          },
        },
      ],
    },
  };
};
