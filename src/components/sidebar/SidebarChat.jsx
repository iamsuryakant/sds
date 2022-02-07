import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Avatar } from '@mui/material';
import { db } from '../../firebase';
import './Sidebar.css';


function SidebarChat({id, name, addnewchat }) {

    const [seed, setSeed] = useState("");
    const [lastmessage, setLastMessage] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

        db.collection("rooms").doc(id).collection("message").orderBy("timestamp", "desc")
            .onSnapshot(snapshot => setLastMessage(snapshot.docs.map(doc => doc.data())))

    }, [])
    
    const createChat = () => {
        const room = prompt("Please enter chat name");

        if(room)
        {
            db.collection("rooms").add({
                name:room
            })
        }
    }

    return (
        !addnewchat ? (
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = {`/room/${id}`}>
                <div className = "sidebar_chat">
                    <Avatar src = {`https://picsum.photos/200/300`} />
                    <div className = "sidebar_chat_info" >
                        <h3>{ name }</h3>
                        <p>{lastmessage[0]?.message}</p>
                    </div >
                </div >
            </Link>
        ) : (
            <div className = "sidebar_chat" onClick = {createChat}>
                    <h2>Add New Chat</h2>
            </div >    
        )
    )
}

export default SidebarChat
