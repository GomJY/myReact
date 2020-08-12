import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';

import GameMatcher from './GameMatcher';
import RouterProps from './RouterProp';

const myRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</Link> &nbsp;
        <Link to="/game/rsp">가위바위보</Link> &nbsp;
        <Link to="/game/responsecheck">반응속도 체크</Link> &nbsp;
        <Link to="/game/index">게임 매쳐</Link> &nbsp;
        <Link to="/routeProps">라우터 프롭스</Link> &nbsp;
      </div>
      <Switch>
        <Route path="/game/:name" component={ GameMatcher}/>
        {/* <Route path="/routeProps" component={ () => <RouterProps myProp="propDataTest" /> }/> */}
        <Route path="/routeProps" abc="1232" render={ (props) => <RouterProps {...props, {propsDataTest: "propsTestingData"} } /> }/>
      </Switch>
    </BrowserRouter>
  );
};

export default myRouter;