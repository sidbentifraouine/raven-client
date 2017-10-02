const { join } = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      root: join(__dirname, './'),
      path: [join(__dirname, './src/components')],
    },
    'postcss-mixins': {},
    'postcss-apply': {},
    'postcss-nesting': {},
    'postcss-cssnext': {},
  },
};
