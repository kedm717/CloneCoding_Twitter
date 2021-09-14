import { dbService } from "firebase";
const Tweet = ({tweetObj, isOwner}) => {

    const onDeleteClick = async () => { // 삭제 버튼을 눌렀을때 경고 메세지가 나오면서 확인/취소 창이 나오고 확인을 눌렀을때 true/ 취소 false 가 나오고 삭제해주는 버튼함수
        const ok = window.confirm("삭제 할거임??");
        console.log(ok);
        if(ok){
            console.log(tweetObj.id);
            const data = await dbService.doc(`tweets/${tweetObj.id}`).delete();
            console.log(data);
        }
    }
    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
            <button onClick = {onDeleteClick}>Delete Tweet</button>
            <button>Edit Tweet</button>
                </>
            )}
           
        </div>
    );
};

export default Tweet;