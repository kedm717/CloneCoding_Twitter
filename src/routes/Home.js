import { useEffect,useState} from 'react';
import { dbService, storageService} from 'firebase';
import Tweet from "components/Tweet";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([]) // 받은 데이터로 게사물 목록을 만들기 위한 useState
    const [attachement, setAttchement] = useState("");
    
    useEffect(()=>{
        dbService.collection("tweets").onSnapshot((snapshot)=>{
            const newArray = snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    },[]);

    
    const onSubmit = async(event) =>{
        event.preventDefault();
        let attachmentUrl = "";
        if(attachement !== ""){
        const attachementRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachementRef.putString(attachement, "data_url");
        const attachmentUrl = await response.ref.getDownloadURL();
        }
         await dbService.collection("tweets").add({
            text : tweet,
            createAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        });
        setTweet("");
        setAttchement("");
    };

    const onChang = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setTweet(value);
    }

    const onFileChange = (event) => {
        const {
            target : { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {
                currentTarget: { result},
            } = finishedEvent;
            setAttchement(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttchement("");

    return (
        <>
      <form onSubmit= {onSubmit}>
          <input 
          value = {tweet}
          onChange ={onChang}
          type = "text"
          placeholder = "What`s on your mind?"
          maxLength={120}
          />
        <input type ="file" accept="image/*" onChange ={onFileChange} />
        <input type ="submit" value = "tweet" />
        {attachement && (
            <div>
             <img src ={attachement} width="50px" height ="50px" />
            <button onClick={onClearAttachment}>clear</button>
            </div>
            )}
      </form>
      <div>
        {tweets.map((tweet)=>( //트윗 목록이 보이는 맵핑!
        // Tweet.js로 연결
            <Tweet key={tweet.id} tweetObj = {tweet}
            isOwner ={tweet.creatorId === userObj.uid}
            />
        ))}
      </div>
      </>
    );
};

export default Home;