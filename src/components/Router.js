import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';

const AppRouter = ({isLoggedIn}) => { /*상위 컴포넌트에서 받은 프롭스는 구조분해 할당으로 사용*/
  return (
    <Router>
      <Switch>
      {isLoggedIn ? (
        <Route exact path = "/">
          <Home />
        </Route>
      ) : (
        <Route exact path = "/">
          <Auth />
        </Route>
      )}
      </Switch>
    </Router>
  );
};

export default AppRouter;


