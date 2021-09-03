import AppRouter from './Router';
import {useState} from 'react'
import { authService } from 'routes/fbase';


function App(){
  const {isLoggedIn, setIsLoggedIn} = useState(authService.currentUser);
  return (
  <>
  <AppRouter isLoggedIn = {isLoggedIn}/>
  <footer>& copy; {new Date().getFullYear()} dongchanTwitter</footer> 
  </>
    );
};

export default App;