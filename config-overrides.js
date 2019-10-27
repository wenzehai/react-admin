const {override, fixBabelImports, addLessLoader, addWebpackExternals} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#5fbeaa'},
  }),
  // 这里添加全局配置
  addWebpackExternals({
    TMap: 'T'
  })
);