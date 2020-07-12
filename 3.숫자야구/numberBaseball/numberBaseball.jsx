import React, { Component } from 'react';
import Try from './Try';


function getNumbers() { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  return '';
}


class NumberBaseball extends Component {
  // 바인드 사용법
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: [],
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onSubmitForm(e) {
  e.preventDefault();

  };
  onChangeInput = function(e) {
    this.setState({value: e.target.value});
  };
  // 일반 사용법
  // state = {
  //   result: '',
  //   value: '',
  //   answer: getNumbers(),
  //   tries: [],
  // };

  // onSubmitForm = (e) => {
  //   e.preventDefault();

  // };
  // onChangeInput = (e) => {
  //   this.setState({value: e.target.value});
  // };
  fruits = [
    {key: '사과', value: '100원'},
    {key: '멜론', value: '200원'},
    {key: '포도', value: '300원'},
    {key: '앵두', value: '400원'},
    {key: '수박', value: '500원'},
  ];
  
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
        </form>
        <div>시도: {this.state.tries.length}</div>
        {/* 시도한 입력 및 결과 */}
        <ul>
            {this.fruits.map((v, i) => (
              <Try key={v.key + v.value} value={v} index={i}/>
            ))}
        </ul>
      </>
    );
  };
}

export default NumberBaseball;