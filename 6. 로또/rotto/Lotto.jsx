import React, { useState, useRef, useEffect, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getNumbers');
  
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const boundsNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, boundsNumber];
}

const Lotto = () =>{
  const lottoNumbers = useCallback(() => getWinNumbers(), [redo]);  
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const onClickRedo = () => {
    console.log(" onClickRedo()");
    //#3 use callBack 문제
    console.log(winNumbers);
    setWinBalls(lottoNumbers);
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1)* 1000);
    };

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach(item => clearTimeout(item));
    }
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일

  return (
    <>
      <h1>로또 - Class</h1>
      <div>당첨 숫자</div>
      <div id ="결과창">
        {winBalls.map((v) => <Ball key= {v} number= {v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus}/>}
      {redo && <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>}
    </> 
  );
}

export default Lotto;