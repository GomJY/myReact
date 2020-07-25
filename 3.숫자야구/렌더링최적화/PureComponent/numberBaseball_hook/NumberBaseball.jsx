import React, { useState, memo } from 'react';
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

const NumberBaseball = memo (() => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')) {
      setResult('홈럼!');
      setTries([...tries, {try: value, result: '홈럼!'}]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}이 였습니다.`);
        alert('게임을 다시 시작하빈다.');
        setValue('');
        setAnswer(getNumbers);
        setTries([]);
      } else {
        for(let i =0; i <4; i += 1) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries( [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]);
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  

  return (
    <>
      <h1>숫자야구 - memo</h1>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput}/>
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

});

export default NumberBaseball;