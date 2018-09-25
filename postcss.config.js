const { join } = require('path')

module.exports = {
  plugins: {
    'postcss-import': {
      root: join(__dirname, './'),
      path: [join(__dirname, './src/components')]
    },
    'postcss-mixins': {},
    'postcss-nesting': {},
    'postcss-preset-env': {}
  }
}
