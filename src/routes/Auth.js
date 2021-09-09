import {useState} from "react";
import { authService, firebaseInstance } from "./fbase";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChang = (event) => {
       const {
           target : {name, value},
       } = event;
       if(name === "email"){
           setEmail(value);
       } else if(name === "password"){
           setPassword(value);
       }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                //create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (err){
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev)=> !prev);

    const onSocialClick = async(event) => {
        const {
            target: {name},
        } = event;

        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoolgeAuthProvider();

        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data)
    }
    return (
        <div>
            <form onSubmit ={onSubmit}>
                <input 
                name = "enail"
                type = "email"
                 placeholder ="Email" 
                 required 
                 value = {email}
                 onChange = {onChang}/>
                <input 
                name = "paswword" 
                type = "password" 
                placeholder = "password" 
                required
                value = {password}
                onChange = {onChang}/>
                <input type = "submit" value = {newAccount ? "Create Account" : "Log In"}/>{error}
            </form>
            <span onClick ={toggleAccount}>{newAccount ? "Sign In": "Create Account"}</span>
            <div>
                <button onClick = {onSocialClick} name = "goolge">Continue with Google</button>
                <button onClick = {onSocialClick} name = "github">Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;