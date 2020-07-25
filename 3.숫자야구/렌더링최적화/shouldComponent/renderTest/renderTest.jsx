import React, { Component } from 'react';

class RenderTest extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;

  };
  
  onClick = () => {
    this.setState((prev) => { return {counter: prev.counter} });
  }

  onCounter = () => {
    this.setState((prev) => { return {counter: prev.counter + 1}});
  }

  render() {
    console.log('렌더링', this.state);
    return (
    <>
      <div>렌더링 - shouldComponentUpdate</div>
      <button onClick={this.onCounter}>렌더링 카운터</button>
      <button onClick={this.onClick}>노 렌더링</button>
    </>);
  }
}

export default RenderTest;