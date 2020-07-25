const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: [ '.jsx', '.js' ],
  },
  
  entry: {
    app: './client',  
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          //@babel/preset-react 로 브라우저 지원을 대상화시키기
          ['@babel/preset-react', {
            target: {
              browsers: ['> 5% in kor', 'last 2 chrome versions'],
            },
            debug: true,
          }],
          '@babel/preset-env', 
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel', 
        ],
      },
    }],
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },
};