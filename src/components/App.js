import {useEffect, useState} from 'react'
import { authService } from 'routes/fbase';
import AppRouter from 'components/Router';


function App(){
  const [init, setInit] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[]);

  return (
  <>
  {init ? <AppRouter isLoggedIn = {isLoggedIn}/> : "initalizing..."}
  <footer>& copy; {new Date().getFullYear()} dongchanTwitter</footer> 
  </>
    );
};

export default App;