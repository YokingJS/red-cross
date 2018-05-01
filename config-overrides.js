

const { injectBabelPlugin } = require('react-app-rewired');
const pxtorem = require('postcss-pxtorem');

module.exports = function override(config, env) {
  config = injectBabelPlugin([
    'import', { libraryName: 'antd-mobile', style: 'css' }
  ], config);
  return config;
};
