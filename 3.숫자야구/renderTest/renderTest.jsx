import React, { Component } from 'react';

class RenderTest extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(this.state);
    console.log(nextState);
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;

  };
  
  onClick = () => {
    this.setState({});
  }
  onCounter = () => {
    this.setState((prev) => { return {counter: prev.counter + 1}});
    // this.setState({ counter: this.state.counter});
  }

  render() {
    console.log('렌더링', this.state);
    return (<>
      <button onClick={this.onClick}>클릭</button>
      <button onClick={this.onCounter}>카운터</button>
    </>);
  }
}

export default RenderTest;