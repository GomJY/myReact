const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  console.log('렌더링');
  const [first, setFirst]   = useState(Math.ceil(Math.random() * 9)); 
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9)); 
  const [value, setValue]   = useState(''); 
  const [result, setResult]  = useState(''); 

  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      console.log('정답');
      setResult('정답' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');

      inputRef.current.focus();
    } else {
      console.log('오답');
      setResult('오답');
      setValue('');
      inputRef.current.focus();
    }
  }

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          {first} X {second} = <input ref={inputRef} onChange={onChangeInput} value={ value }/>  
        </div>
          <button>입력!</button>
      </form>
      <div id="result"> {result} </div>
    </>
  );
}

module.exports = GuGuDan;