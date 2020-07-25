import React, { Component, useState } from 'react';

const Try = ({ tryInfo }) => {
  //1.props와 state 연결
  const [result, setResult] = useState(tryInfo.result);
  
  const onClick = () => {
    //2.props와 state 연결
    setResult('1');
  };

  //3.props와 state 연결 - Click={onClick}
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div> 
    </li>
  );
};

export default Try;