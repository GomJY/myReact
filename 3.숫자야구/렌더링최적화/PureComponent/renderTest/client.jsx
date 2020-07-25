const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import renderTest from './renderTest';

const Hot = hot(renderTest);

ReactDom.render(<Hot />, document.querySelector('#root'));