import { dbService } from "firebase";
import {useState} from "react" // 트위터 수정기능을 위한 상태 변경 수정 버튼을 눌렀을 때 화면에 출력해야하는 요소를 위해 2가지 상태를 관리
const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false); //트윗 수정기능1
    const [newTweet, setNewTweet] = useState(tweetObj.text); // 트위터 수정기능2

    const onDeleteClick = async () => { // 삭제 버튼을 눌렀을때 경고 메세지가 나오면서 확인/취소 창이 나오고 확인을 눌렀을때 true/ 취소 false 가 나오고 삭제해주는 버튼함수
        const ok = window.confirm("삭제 할거임??");
        console.log(ok);
        if(ok){
            console.log(tweetObj.id);
            const data = await dbService.doc(`tweets/${tweetObj.id}`).delete();
            console.log(data);
        }
    }

    const toggleEditing = () => setEditing((prev)=> !prev); // 수정버튼을 눌렀을때 텍스트가 수정이 되게 하는 함수 

    const onChange = (event) => { // 수정한 내용으로 바꿔주는 함수 
        const{
            target : {value},
        } = event;
        setNewTweet(value);
    }
    const onSubmit = async(event) =>{ // 파이어 베이스에 새로 입력된 값을 반영하는 함수
        event.preventDefault();
        await dbService.doc(`Tweets/${tweetObj.id}`).update({ text: newTweet});
    }
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input onChange ={onChange} value={newTweet} required/>
                    <input type ="submit" value = "Update Tweet" />
                </form>
                <button onClick={toggleEditing}>Cancle</button>
                </>
            ): (
                <>
                <h4>{tweetObj.text}</h4>
                {isOwner && (
                    <>
                <button onClick = {onDeleteClick}>Delete Tweet</button>
                <button onClick = {toggleEditing}>Edit Tweet</button>
                    </>
                )}
                </>
            )}
        </div>
    );
};

export default Tweet;