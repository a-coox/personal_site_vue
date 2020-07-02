const StylelintPlugin = require("stylelint-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

module.exports = {
  configureWebpack: {
    devtool: "source-map",

    plugins: [
      new StylelintPlugin({
        files: ["**/*.vue"]
      }),
      new ImageminWebpWebpackPlugin({ quality: 95 }),
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpg|png|gif|svg)$/i,
        // Enable with or without settings
        pngquant: {
          quality: '90-95'
        },
        svgo: {},
        gifsicle: {},
        plugins: [
          ImageminMozjpeg({quality: 95, progressive: true})
        ],
        // Disable with null
        optipng: null,
        jpegtran: null,
      })
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
