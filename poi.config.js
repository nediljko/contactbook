const extensions = ['.vue'];

const devServer = {
  headers: {
    'X-Powered-By': 'Webpack DevSever'
  },
  port: 8081
};

module.exports = {
  plugins: ['@poi/eslint'],
  entry: {
    app: 'client/main.js'
  },
  chainWebpack(config) {
    config.resolve.extensions.merge(extensions);
  },
  devServer
};
