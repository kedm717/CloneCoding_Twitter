import { useEffect,useState} from 'react';
import { dbService } from 'firebase';
import Tweet from "components/Tweet";

const Home = ({userObj}) => {
    
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([]) // 받은 데이터로 게사물 목록을 만들기 위한 useState

    
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
        await dbService.collection("tweets").add({
            text : tweet,
            createAt : Date.now(),
            creatorId : userObj.uid,
        });
        setTweet("")
    };

    const onChang = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setTweet(value);
    }

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
        <input type ="submit" value = "tweet" />
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