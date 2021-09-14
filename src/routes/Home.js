import { useEffect,useState} from 'react';
import { dbService } from 'firebase';

const Home = ({userObj}) => {
    
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([]) // 받은 데이터로 게사물 목록을 만들기 위한 useState

    
    useEffect(()=>{
        dbService.collection.apply("tweet").onSnapshot((snapshot)=>{
            const newArray = snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setTweet(newArray);
        })
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
            <div key ={tweet.id}>
                <h4>{tweet.text}</h4>
            </div>
        ))}
      </div>
      </>
    );
};

export default Home;