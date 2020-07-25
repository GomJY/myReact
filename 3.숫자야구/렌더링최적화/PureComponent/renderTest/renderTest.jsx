import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
  state = {
    INT: 0,
    string: '',
    number: 1,
    boolean: true,
    object: { },
    array: [],
    objArray: [ { a1: [1], a2: [2]}, {}, {}],
  };
  
  onClick = () => {
    this.setState((prev) => { return {INT: ++prev.INT} });
  }
  onCounter = () => {
    this.setState((prev) => { return {INT: prev.INT + 1}});
  }

  arrayRender = () => {
    this.setState({ array: [...this.state.array, 1] });
  }
  //불변성
  arrayNoRender = () => {
    const array = this.state.array;
    array.push(1);
    this.setState({ array: array });
  }

  objArrayRender = () => {
    this.setState((prev) => { 
      let prevValue = prev.objArray; 

      prevValue[0].a2 = [2];
      return { objArray: [...prevValue] };
    });
  };
  objArrayNoRender = () => {
    this.setState((prev) => { 
      let prevValue = prev.objArray; 

      prevValue[0].a2 = [2];
      return { objArray: prevValue };
    });
  };

  render() {
    console.log('렌더링', this.state);

    return (
    <>
      <div>렌더링 - PureComponent</div>
      <h1>INT</h1>
      <button onClick={this.onCounter}>INT - 렌더링</button>
      <button onClick={this.onClick}>INT - 노 렌더링</button>
      
      <h1>array</h1>
      <button onClick={this.arrayRender}>array - 렌더링</button>
      <button onClick={this.arrayNoRender}>array - 노 렌더링</button>
      
      <h1>주의사항</h1>
      <h2>배열과 객체를 서로 넣는 구조는 최대 2중 구조로만 사용 </h2>
      <h2> 좋은 예 : {`array = [ { a1: 1, a2: 2 }, {} ...]`} </h2>
      <h2> 안좋은 예 : {`array = [ { a1: {a1a: {}} }, {} ...]`} </h2>
      <button onClick={this.objArrayRender}>objArray - 렌더링</button>
      <button onClick={this.objArrayNoRender}>objArray - 노 렌더링</button>
    
    </>);
  }
}

export default RenderTest;