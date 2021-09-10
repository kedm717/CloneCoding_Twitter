import {useState} from "react";
import { authService } from "../firebase";

const Auth = () => {

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
            console.log(data);
        }catch(error){
            console.log(error)
        }
    };

    return (     
        <div>
            <form onSubmit= {onSubmit}>
                <input 
                name ="email"
                type ="email" 
                placeholder ="Email" 
                required
                value ={email}
                onChange={onChang} 
                />
                <input
                name = "password" 
                type ="password" 
                placeholder="password" 
                required
                value = {password}
                onChange ={onChang} 
                />
                <input 
                type ="submit" 
                value = {newAccount ? "create Account" : "Log In"}/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
            </div>
    )
}
export default Auth;