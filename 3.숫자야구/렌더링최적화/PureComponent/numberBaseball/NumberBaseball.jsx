import React, { PureComponent } from 'react';
import Try from './Try';


function getNumbers() { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for(let i = 0; i < 4; i +=1) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * ( 9  - i ))
      , 1)[0];
    array.push(chosen);
  }
  return array;
}


class NumberBaseball extends PureComponent {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈럼!',
        tries: [...this.state.tries, {try: this.state.value, result: '홈럼!'}],
      });
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}이 였습니다.`
        });
        alert('게임을 다시 시작하빈다.');
        this.setState({
          value: '',
          answer: getNumbers,
          tries: [],
        });
      } else {
        for(let i =0; i <4; i += 1) {
          if(answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼`}]
        });
      }
    }
  };
  onChangeInput = (e) => {
    this.setState({value: e.target.value});
  };
  
  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>숫자야구 - pureComponent</h1>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput}/>
        </form>
        <div>시도: {tries.length}</div>
        {/* 시도한 입력 및 결과 */}
        <ul>
            {tries.map((v, i) => (
              <Try key ={`${i + 1}'차 시도`} tryInfo={v}/>
            ))}
        </ul>
      </>
    );
  };
}

export default NumberBaseball;