import { authService, dbService } from "../firebase";
import { useHistory } from "react-router-dom";
import { useState, useEffect} from "react";


const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick =() =>{
        authService.signOut();
        history.push("/")
    };

    const onChange =(event) => {
        const {
            target: {value}
        } =event;
        setNewDisplayName(value);
    };

    const onSubmit =async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({ displayName : newDisplayName });
        }
    };


    //주소 이동 로그아웃 될시 
    return (
        <>
        <form onSubmit ={onSubmit}>
        <input type ="text" placeholder= "DisplayName" onChange ={onChange} value={newDisplayName}/>
        <input type ="submit" value = "Update Profile" />
        </form>
        <button onClick ={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;