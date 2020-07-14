const React = require('react');
const { Component } = React;

function getOperation() {
  console.log('getOperation');
  let random = Math.ceil((Math.random() * 9)/4 + 1);
  
  if(random == 1) {
    return '+';
  } else if(random == 2) {
    return '-';
  } else if(random == 3) {
    return '/';
  } else if(random == 4) {
    return '*';
  }
}


class RandomCalc extends Component {
  state = {
    first: Math.ceil((Math.random() * 9) + 1 ),
    second: Math.ceil((Math.random() * 9) + 1),
    operation: getOperation(),
    value: '',
    message: '',
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    let result = 0;
    let first = this.state.first,
        second = this.state.second;

    result = Math.floor(eval(first + this.state.operation +second), 0);

    if(result == this.state.value) {
      this.setState({
        message: '정답 입니다.',
        value: '',
        first: Math.ceil((Math.random() * 9) + 1 ),
        second: Math.ceil((Math.random() * 9) + 1),
        operation: getOperation(),
      });
    } else {
      this.setState({
        message: '틀렸습니다.',
        value: '',
      });
      this.input.focus();
    }
  }

  onChangeInput = (e) => {
    this.setState({value: e.target.value});
  }

  input;
  onRefInput = (c)  => {
    this.input = c;
  }
  
  render() {
    console.log('render')
    return (
      <>
        <div>{this.state.first} {this.state.operation} {this.state.second}</div>
        <form onSubmit={this.onSubmitForm}>
            <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
            <button>입력!</button>
          </form>
          <div>{this.state.message}</div>
      </>
    );

  };
}

module.exports = RandomCalc;