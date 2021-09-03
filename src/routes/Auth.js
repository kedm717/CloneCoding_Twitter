import {useState} from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const onSubmit = (event) => {
        event.preventDefault();
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
                <input type = "submit" value = "Log In"/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;