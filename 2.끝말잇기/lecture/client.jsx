const React =  require('react');
const ReactDom =  require('react-dom');

const WorldRelay = require('./WorldRelay.jsx');

//babel이 없는 경우에는 JSX가 없어  <WorldRelay />를 무슨 데이터 형식인지 인식할수가 없어 버그가 발생한다.
ReactDom.render(<WorldRelay />, document.querySelector('#root'));