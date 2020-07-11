const React = require('react');
const { Component } = React;

class RandomCalc extends Component {
  state = {
    first: Math.ceil((Math.random() * 9)/4 + 1 ),
    second: Math.ceil((Math.random() * 9)/4 + 1),
    operation: '',
    value: '',
    message: '',
    right: '',
  }

  
  onChangeInput = (e) => {
    this.setState({value: e.target.value});
  }

  input;
  onRefInput = (c)  => {
    this.input = c;
  }
  
  render() {
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




// function randomOperation() {
//   let random = Math.ceil((Math.random() * 9)/4 + 1);
//   let right_result = 0;
//   console.log(this);
//   let first = this.state.first;
//   let second =this.state.second; 

//   if(random == 1) {
//     this.setState({ value: '+' });
//     right_result = first + second ;
//   } else if(random == 2) {
//     this.setState({ value: '-' });
//     right_result = first - second ;
//   } else if(random == 3) {
//     this.setState({ value: '/' });
//     right_result = first / second ;
//   } else if(random == 4) {
//     this.setState({ value: '*'});
//     right_result = first * second ;
//   }
//   this.setState({ right: right_result });
// }
// console.log(randomOperation);
// randomOperation();