const StylelintPlugin = require("stylelint-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminPngquant = require('imagemin-pngquant');
// const ImageminWebp = require('imagemin-webp');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

// (process.env.NODE_ENV == 'production') ? [] :
module.exports = {
  configureWebpack: {
    devtool: "source-map",

    plugins: [
      new StylelintPlugin({
        files: ["**/*.vue"]
      }),
      new CopyPlugin([{
        from: 'public/img'
      }]),
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpg|png|gif|svg)$/i,
        pngquant: {
          quality: '90-100'
        },
        plugins: [
          ImageminMozjpeg({quality: 90, progressive: true})
        ]
      }),
      new ImageminWebpWebpackPlugin({ quality: 100 })
    ]
  },
  chainWebpack(config) {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
