import {authService} from "firebase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();

    const onLogOutClick =() =>{
        authService.signOut();
        history.push("/")
    };
    //주소 이동 로그아웃 될시 
    return (
        <>
        <button onClick ={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;