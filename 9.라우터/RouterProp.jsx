import React, { Component } from 'React';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';


class GameMatcher extends Component{ 
  
  render() {
    console.log(this.props);

    return(
      <>
        {this.props.myProp}
      </>
    );
  };
};

export default GameMatcher;