import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
  };
  //렌더링시 재선언 하기 싫은 변수
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const {state, message, result } = this.state;
    if(state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.'
      });
      //랜덤 지연 시간 만들고 이번트 설정
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        //시작 시간 체크
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);//2 ~ 3초 랜덤

    } else if ( state === 'ready' ) {
      this.setState({
        state: 'waiting',
        message: '너무 성급 하시네요. 초록새일떄 클릭해주세요.'
      });
      //기존에 있던 setTimeout 초기화
      clearTimeout(this.timeout);
    } else if ( state === 'now' ) {
      //결과 시간 체크
      this.endTime = new Date();
      this.setState( (prevState) => {
        return {
          state: 'waiting',
          message: '다시 하고 싶다면 클릭',
          result: [...prevState.result, this.endTime - this.startTime],
        }
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 
      ? null 
      : <div>평균시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
  };

  render() {
    console.log('렌더링');
    console.log(this.state);
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
          >
            {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  };
}

export default ResponseCheck;