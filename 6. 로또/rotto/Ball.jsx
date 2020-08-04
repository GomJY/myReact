import React from 'react';

const Ball = ({ number }) => {
  let background= getBallColor(number);
  return (
    <div className="ball" style={{ background }}>{number}</div>
  );
}

function getBallColor(number) {
  if(number <= 10) {
    return "red";
  } else if (number <= 20 ) {
    return "orange";
  } else if (number <= 30 ) {
    return "yellow";
  } else if (number <= 40 ) {
    return "blue";
  } else {
    return "green";
  } 
}

export default Ball;
