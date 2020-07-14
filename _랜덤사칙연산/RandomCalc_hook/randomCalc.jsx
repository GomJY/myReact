const React = require('react');
const { useState, useRef } = React;

function getOperation() {
  console.log('getOperation');
  let random = Math.ceil((Math.random() * 9)/4);
  let operation = ['+', '-', '/', '*'];
  return operation[random];
}

const RandomCalc = () => {
  const [first, setFirst ] = useState(Math.ceil((Math.random() * 9) + 1 ));
  const [second, setSecond ] = useState(Math.ceil((Math.random() * 9) + 1 ));
  const [op, setOp] = useState(getOperation);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    let result = Math.floor(eval(first + op +second), 0);
    
    if(result == value) {
      setMessage(`${first}${op}${second} = ${result} 정답 입니다.`);
      setFirst(Math.ceil((Math.random() * 9) + 1 ));
      setSecond(Math.ceil((Math.random() * 9) + 1 ));
      setValue('');
      setOp(getOperation());
    } else {
      setValue('');
      setMessage('틀렸습니다.');
      inputRef.current.focus();
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  
  return (
    <>
      <div>{first} {op} {second}</div>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} value={value} onChange={onChangeInput} />
            <button>입력!</button>
        </form>
      <div>{message}</div>
    </>
  );
}

module.exports = RandomCalc;