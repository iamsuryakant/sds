import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@mui/material';
// import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Sidebar.css';


function Sidebar() {
    //when app renders it collects all the chats and renders them in the sidebar    
    const [rooms, setRooms] = useState([]);
    
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    }, []);

    return (
        <div className = 'sidebar'>
            <div className='sidebar_header'>
                <Avatar src = {user.photoURL} onClick = {e=>firebase.auth().signOut()} />
                
                <div className='sidebar_Hright'>
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className='sidebar_search'>
                <div className='sidebar_search_container'>
                    
                    <IconButton className = "Search_Ic"><SearchIcon /></IconButton>
                    <input type='text' placeholder='Search or start new chat' />
                    
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addnewchat />
                {
                    rooms.map(room => {
                        return <SidebarChat
                            key={room.id}
                            id = {room.id}
                            name = {room.data.name}
                        />
                    })
                }
                {/* <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
            </div>
                  

        </div>
    )
}

export default Sidebar;
