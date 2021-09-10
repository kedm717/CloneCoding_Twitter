import { useEffect,useState} from "react";
import AppRouter from "components/Router";
import { authService } from "../firebase";



function App(){
  const [init, setInit] = useState(false)
  const {isLoggedIn, setIsLoggedIn} = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(user);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[setIsLoggedIn]);
  
  return (
  <>
  { init ? <AppRouter isLoggedIn ={isLoggedIn}/> : "initializing..."}
    <footer>
      &copy; {new Date().getFullYear()} ChanTwitter </footer>

  </>
  );
}
export default App;