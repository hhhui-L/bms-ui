module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    '@vue/app',
    '@vue/babel-preset-jsx',
    ['@babel/preset-env', {
      corejs: 3,
      useBuiltIns: 'usage'
    }]
  ]
}
