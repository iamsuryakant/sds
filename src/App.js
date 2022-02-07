import React, {useEffect} from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useStateValue } from './StateProvider';
import {auth} from './firebase';


function App() {

  // to use context Api

  const [{ user }, dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      dispatch({
        type: 'SET_USER',
        user: user
      })
    })

  }, []);


  return (
    <Router>
      <Switch>
        {!user ? (<Login />) : (
          <div className="App">
          <div className='appbd'>
            <Sidebar />
            <Route exact path = "/">
                <Chat/>
            </Route>

            <Route exact path = "/room/:roomId">
                <Chat/>
            </Route>

          </div>
          </div>
        )}
        
      </Switch>
    </Router>
  );
}

export default App;
