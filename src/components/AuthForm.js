import {useState} from "react";
import { authService} from "../firebase";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("") 
    
    const onChang = (event) => {
        const {
            target : {name, value},
        } = event;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value)
        }
    };
    const onSubmit = async(event) => { //회원가입 분기 시기는 함수
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                //creat newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else {
                //log in
                data = await authService.createUserWithEmailAndPassword(email, password);
            }
           
        }catch(error){
           setError(error.message)
        }
    };
    const toggleAccount = () => setNewAccount((prev)=> !prev);
    return (     
        <>
            <form onSubmit= {onSubmit} className="container">
                <input 
                name ="email"
                type ="email" 
                placeholder ="Email" 
                required
                value ={email}
                onChange={onChang} 
                className= "authInput"
                />
                <input
                name = "password" 
                type ="password" 
                placeholder="password" 
                required
                value = {password}
                onChange ={onChang} 
                className = "authInput"
                />
                <input 
                type ="submit" 
                value = {newAccount ? "create Account" : "Log In"}
                className = "authInput authSubmit"
                />
                {error &&<span className ="authError">{error}</span>}
            </form>
            <span onClick ={toggleAccount} className="authSwith">
                {newAccount ? "Sign In" : "Create Account"}
                </span>
            </>
    )

};


    export default AuthForm;