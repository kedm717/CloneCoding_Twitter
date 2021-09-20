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
        setUserObj({
          uid: user.uid,
          displayName : user.displayName,
          updateProfile: (args)=> user.updateProfile(args),
        });
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  },[]);

  const refreshUser = () => { // 함수가 실행되면 인증 모듈에서 authService.currentUser를 통해 얻은 새 user를 업데이트 해줌.
   const user = authService.currentUser;
   setUserObj({
     uid: user.uid,
     displayName: user.displayName,
     updateProfile: (args) => user.updateProfile(args),
   })
  }
  
  return (
  <>
  { init ? <AppRouter 
  isLoggedIn ={Boolean(userObj)} 
  userObj ={userObj} 
  refreshUser ={refreshUser}
  /> : "initializing..."}
  </>
  );
}
export default App;