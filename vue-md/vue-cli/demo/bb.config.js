const CleanPluginForCommand = require('./plugins/clean')

module.exports = {
  plugins: {
    commands: [ CleanPluginForCommand('hello options') ]
  }
}