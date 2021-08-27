import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const Router = () => {
  const [login, setLogin] = useState(false);
  return (
    <Route>
      <Switch>
        {login ? (
          <>
            {/* 많은 엘리먼트 사용할대 플레그 먼트 */}
            <Route exact path="/"></Route> {/* 홈화면 */}
          </>
        ) : (
          <Route exact path="/">
            <Auth /> {/*login */}
          </Route>
        )}
      </Switch>
    </Route>
  );
};

export default Router;
{
  /* 우리가 렌더시킬 routes 로그인 여부에따라 달라질것이다 */
}

