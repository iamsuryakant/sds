import React from 'react';
import logo from './logo.png';
import { auth, provider } from '../../firebase';
import {useStateValue} from '../../StateProvider';
import './Login.css';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {

        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: 'SET_USER',
                user: result.user
            })

        }).catch(error=>alert(error))
    }


    return (
        <div className = "login_com">
            <div className="login">
                <div className="login_header">
                    <img src = {logo} alt = "logo" />
                    <h1>Secure Data Sharing</h1>
                    <p>Sign in to your account</p>
                    <button onClick = {signIn}>Login with Gmail</button>
                </div>
            </div>
        </div>
    )
}

export default Login
