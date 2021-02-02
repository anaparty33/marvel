const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
          presets: [
            "@babel/preset-env", 
            "@babel/preset-react",
            {
              'plugins': ['@babel/plugin-proposal-class-properties']
            }
          ]
        }
      }
    ]
  },
  resolve: {
      alias: {
        actions: path.resolve(__dirname, 'src/actions'),
        assets: path.resolve(__dirname, 'src/assets'),
        apps: path.resolve(__dirname, 'src/components/apps'),
        base: path.resolve(__dirname, 'src/components/base'),
        components: path.resolve(__dirname, 'src/components'),
        contexts: path.resolve(__dirname, 'src/contexts'),
        constants: path.resolve(__dirname, 'src/constants'),
        header: path.resolve(__dirname, 'src/components/header'),
        mock: path.resolve(__dirname, 'src/mock'),
        modals: path.resolve(__dirname, 'src/components/modals'),
        reducers: path.resolve(__dirname, 'src/reducers'),
        services: path.resolve(__dirname, 'src/services'),
        views: path.resolve(__dirname, 'src/components/views'),
      },
      extensions: ['.js', '.jsx']
  }
};
