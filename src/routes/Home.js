import {useState} from 'react';

const Home = () => {
    const [tweet, setTweet] = useState("")
    
    const onSubmit = (event) =>{
        event.preventDefault();
    };

    const onChang = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setTweet(value);
    }

    return (
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
    );
};

export default Home;