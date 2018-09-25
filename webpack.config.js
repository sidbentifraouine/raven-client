function buildConfig (env) {
  return require('./config/webpack/' + env + '.js') // eslint-disable-line
}

module.exports = buildConfig
