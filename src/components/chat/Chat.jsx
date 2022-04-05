import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useStateValue } from '../../StateProvider';
import './Chat.css';

function Chat() {

    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [{user}, dispatch] = useStateValue();


    // var CryptoJS = require("crypto-js");

    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
    // console.log("encrypted text", ciphertext.toString());

    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("decrypted text", plaintext);

    useEffect(() => {
        if (roomId)
        {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);

            });
            
            db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp", "asc")
                .onSnapshot(snapshot => { 
                    setMessages(snapshot.docs.map(doc=> doc.data()))
                })

        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();

        if (input === "")
        {
            return alert("Please enter a message");
        }

        db.collection("rooms").doc(roomId).collection("message").add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        var CryptoJS = require("crypto-js");

        var ciphertext = CryptoJS.AES.encrypt(input, 'secret key 123');
        console.log(ciphertext.toString());

        var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log("decrypted text", plaintext);

        setInput("");

    }


    return (

        <div className = "chat">
            <div className = "chat_header">
                <Avatar src = {`https://picsum.photos/200/300`}/>
                <div className='chat_header_info'>
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleTimeString()}</p>
                </div>
                <div className='chat_header_right'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

            <div className="chat_body">
            {
                    messages.map(message => (
                        <p className = {`chat_message ${user.displayName === message.name && "chat_receiver" } `}>
                            <span className = "chat_name">{message.name}</span>
                            {message.message}

                            <span className = "chat_time">
                                {new Date(message.timestamp?.toDate()).toLocaleTimeString()} 
                            </span>

                        </p>

                    ))
            }
                {/* <p className="chat_message chat_receiver">
                    <span className="chat_name">Vikash IT</span>
                    Hi there!
                    <span className = "chat_time">01:02 PM</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">John Doe</span>
                    Hi there!
                    <span className = "chat_time">01:02 PM</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">John Doe</span>
                    Hi there!
                    <span className = "chat_time">01:02 PM</span>
                </p> */}

            </div>

            <div className="chat_footer">
                
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <IconButton>
                    <AttachFileIcon />
                </IconButton>

                <form onSubmit = {sendMessage}>
                    <input value={input} placeholder="Type a message" type="text" onChange={ 
                        (e) => setInput(e.target.value)
                    }/>
                    <input type = "submit" value = "Send" />
                </form>

                <IconButton>
                    <KeyboardVoiceIcon />
                </IconButton>

            </div>


        </div>
    )
}

export default Chat
