const path = require('path');

module.exports = {
  name: 'wordrealay-settings',
  mode: 'development', // 실서비스: production
  
  //아래가 가장 중요
  entry: {  //입력 - 웹팩을 사용해서 합칠 jsx, 여기서는 client, worldRelay
    app: ['./client.jsx']
  },
  output: { //출력 - 하나로 합쳐서 나온 값 설정(이름, 저장 경로 등)
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },

};