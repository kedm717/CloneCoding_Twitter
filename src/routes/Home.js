import { useEffect,useState} from 'react';
import { dbService } from 'firebase';

const Home = ({userObj}) => {
    
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([]) // 받은 데이터로 게사물 목록을 만들기 위한 useState

    const getTweets = async () =>{
        const dbTweets = await dbService.collection("tweets").get();
       dbTweets.forEach((document) => {
        const tweetObject = {...document.data(), id: document.id};
    
        setTweets((prev)=> [tweetObject, ...prev]) // console.log 에서 setTweets 함수로 변경
       })
        // console.log(dbTweet)를 출력할시 파이어베이스에서 보낸 스냅샷이 보일건데 스냅샷이 원본을 찍어 보내 데이터가 스냅샷 속에 숨어있기 때문에 , forEach() 함수로 불러와서 원하는 데이터가 
        // 나올수 있게 출력을 만들어 준 부분!!
        // console.log를 찍어보니 원하는 데이터 값이 나온다 .  
    }
    
    useEffect(()=>{
        getTweets();
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