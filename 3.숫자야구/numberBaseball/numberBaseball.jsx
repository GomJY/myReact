import React, { Component } from 'react';

function getNumbers() { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  return '';
}


class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = () => {
    
  };
  onChangeInput = () => {

  };
  
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {[
            {key: '사과', value: '100원'},
            {key: '멜론', value: '200원'},
            {key: '포도', value: '300원'},
            {key: '앵두', value: '400원'},
            {key: '수박', value: '500원'},
          ].map((v, i) => {
            
              <li key={v.key + v.value}><b>{v.key}</b> - {v.value}</li>
            
          })}
        </ul>
      </>
    );
  };
}

export default NumberBaseball;