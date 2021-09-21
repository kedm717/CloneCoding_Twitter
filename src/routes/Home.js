import { useEffect,useState} from 'react';
import { dbService} from 'firebase';
import Tweet from "components/Tweet";

import TweetFactory from 'components/TweetFactory';

const Home = ({userObj}) => {
    
    
    const [tweets, setTweets] = useState([]) // 받은 데이터로 게사물 목록을 만들기 위한 useState
  
    
    useEffect(()=>{
        dbService.collection("tweets").onderBy("creatAt", "desc").onSnapshot((snapshot)=>{
            const newArray = snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    },[]);

    
   

    return (
        <div className="container">
        <TweetFactory userObj ={userObj}/>
      <div style={{
          marginTop :30
      }}>
        {tweets.map((tweet)=>( //트윗 목록이 보이는 맵핑!
        // Tweet.js로 연결
            <Tweet key={tweet.id} tweetObj = {tweet}
            isOwner ={tweet.creatorId === userObj.uid}
            />
        ))}
      </div>
      </div>
    );
};

export default Home;