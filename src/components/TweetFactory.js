import {useState} from "react";
import { dbService, storageService } from "firebase";
import {v4 as uuidv4} from "uuid";

const TweetFactory = ({userObj}) => {

    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("")

    const onSubmit = async(event) =>{
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
        const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        const attachmentUrl = await response.ref.getDownloadURL();
        }
         await dbService.collection("tweets").add({
            text : tweet,
            createAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        });
        setTweet("");
        setAttachment("");
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
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("");

    return (
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
        {attachment && (
            <div>
             <img src ={attachment} width="50px" height ="50px" />
            <button onClick={onClearAttachment}>clear</button>
            </div>
            )}
      </form>
      );
};

export default TweetFactory;