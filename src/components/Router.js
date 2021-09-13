import { HashRouter as Router,Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';


const AppRouter = ({isLoggedIn}) => { /*상위 컴포넌트에서 받은 프롭스는 구조분해 할당으로 사용*/
  
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
      {isLoggedIn ? (
        <>
        <Route exact={true} path = "/">
          <Home />
        </Route>
        <Route exact={true} path = "/profile">
        <Profile/>
      </Route>
      </>
      ) : (
        <Route exact = {true}>
          <Auth />
        </Route>
      )}
      <Redirect from ="*" to = "/"/>
      </Switch>
    </Router>
  );
};

export default AppRouter;


