const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import TickTaeToe from './TickTaeToe.jsx';

const Hot = hot(TickTaeToe);

ReactDom.render(<Hot />, document.querySelector('#root'));