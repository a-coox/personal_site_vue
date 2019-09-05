const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',

    plugins: [
      new StylelintPlugin({
        files: ['**/*.vue']
      })
    ]
  },
  chainWebpack(config) {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
};
  