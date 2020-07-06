const path = require('path');

module.exports = {
  name: 'wordrealay-settings',
  mode: 'development', // 실서비스: production
  

  //resolve를 사용하면 .js .jsx로 시작하는 것은 전부 entry.app에 넣어준다.
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // },

  //아래가 가장 중요
  entry: {  //입력 - 웹팩을 사용해서 합칠 jsx, 여기서는 client가 worldRelay까지 불러와 준다.
    app: ['./client.jsx']
  },

  //entry에 있는 파일을 읽고 거기에 module을 적용하고 output에 뺀다.
  module: {
    rules: [{
      test: /\.jsx?/,           //정규식
      loader: 'babel-loader',   //로더
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  output: { //출력 - 하나로 합쳐서 나온 값 설정(이름, 저장 경로 등)
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },



};