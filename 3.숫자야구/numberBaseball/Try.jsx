import React, { Component } from 'react';

class Try extends Component {
  //1.props와 state 연결
  constructor(props) {
    super(props);
    //2.props와 state 연결
    this.state = {
      result: this.props.result,
      try: this.props.try,
    }  
  }

  
  //3.props와 state 연결 - <div>{this.state.tryInfo.try}</div>
  render() {
    return (
      <>
        <li>
          <div>{this.state.tryInfo.try}</div>
          <div>{this.state.tryInfo.result}</div> 
        </li>
      </>
    );
  };
}

export default Try;