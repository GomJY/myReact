import React, { useState, useRef } from 'react';


const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if(state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      //랜덤 지연 시간 만들고 이번트 설정
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        //시작 시간 체크
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);//2 ~ 3초 랜덤

    } else if ( state === 'ready' ) {
      setState('waiting');
      setMessage('너무 성급 하시네요. 초록새일떄 클릭해주세요.');
      //기존에 있던 setTimeout 초기화
      clearTimeout(timeout.current);
    } else if ( state === 'now' ) {
      //결과 시간 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('다시 하고 싶다면 클릭');
      console.log('타임',endTime.current - startTime.current);
      setResult([...result, endTime.current - startTime.current]);
    }
  };

  const onReset = () => {
    setResult([]);
  };
  
  const renderAverage = () => {
    return result.length === 0 
      ? null 
      : 
        <>
          <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={onReset}>리셋</button>
        </> 
  };

  console.log(result, state, message);
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
        >
          {message}
      </div>
      {renderAverage()}
    </>
  );

}

export default ResponseCheck;