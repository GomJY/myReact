const React = require('react');
const { Component } = React;

class WorldRelay extends Component {
  state = {
    text: 'hello, webpack',
  };
  render() {
    return <h1>{this.state.text}</h1>
  }
}

module.exports = WorldRelay;

