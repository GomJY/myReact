import React, { Component } from 'React';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import NumberBaseball from '../3.숫자야구/numberBaseball/NumberBaseball';
import ResponseCheck from '../4.반응속도체크/responseCheck_Class/ResponseCheck';
import RSP from '../5.가위바위보/RSP_Class/RSP_class';
const path = require('path');

class GameMatcher extends Component{ 
  
  render() {
    console.log(this.props);
    const pathName = this.props.match.params.name;
    let get = new URLSearchParams(this.props.location.search.slice(1));
    console.log(get.getAll("q"));

    switch(pathName) {
      case 'number-baseball' :
        return (<NumberBaseball />);
      case 'responsecheck' :
        return (<ResponseCheck />);
      case 'rsp' :
        return ( <RSP />);
      default: 
    };  
    return(
      <>
        해당게임이 없습니다.
      </>
    );
  };
};

export default GameMatcher;