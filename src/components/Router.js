import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';


const AppRouter = ({isLoggedIn, userObj, refreshUser}) => { /*상위 컴포넌트에서 받은 프롭스는 구조분해 할당으로 사용*/
  
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
      {isLoggedIn ? (
        <>
        <Route exact={true} path = "/">
          <Home userObj={userObj}/>
        </Route>
        <Route exact={true} path = "/profile">
        <Profile refreshUser={refreshUser} userObj= {userObj} />
      </Route>
      </>
      ) : (
        <Route exact = {true}>
          <Auth />
        </Route>
      )}
      
      </Switch>
    </Router>
  );
};

export default AppRouter;


