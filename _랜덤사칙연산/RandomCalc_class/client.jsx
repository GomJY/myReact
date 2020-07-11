const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const RandomCalc = require('./randomCalc');

const Hot = hot(RandomCalc);

ReactDom.render(<Hot />, document.querySelector('#root'));