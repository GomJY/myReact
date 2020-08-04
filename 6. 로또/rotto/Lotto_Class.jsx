import React, { PureComponent } from 'react';
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

class Lotto extends PureComponent {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];
  
  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1)* 1000);
    };
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.runTimeouts();
  }

  componentWillMount() {
    console.log(" componentWillMount()");
    this.timeouts.forEach(item => clearTimeout(item));
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    if(this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  };


  onClickRedo = () => {
    console.log(" onClickRedo()");
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render () {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <h1>로또 - Class</h1>
        <div>당첨 숫자</div>
        <div id ="결과창">
          {winBalls.map((v) => <Ball key= {v} number= {v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>}
      </> 
    )
  }
}

export default Lotto;