const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import myRouter from './myRouter.jsx';

const Hot = hot(myRouter);

ReactDom.render(<Hot />, document.querySelector('#root'));