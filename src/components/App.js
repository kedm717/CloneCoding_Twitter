/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useState} from "react";
import AppRouter from "components/Router";
import { authService } from "../firebase";



function App(){
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); // 트윗을 작성한 유저 정보를 보여주기 위한 useState


  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(user);
        setUserObj(user);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  },[]);
  
  return (
  <>
  { init ? <AppRouter isLoggedIn ={isLoggedIn} userObj ={userObj} /> : "initializing..."}
  </>
  );
}
export default App;