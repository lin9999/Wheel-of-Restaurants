import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
    baseURL: API_ROOT
})

function App() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        const ret = await instance.post('/auth', { userName: userName, password: password })
        console.log(ret.data.message)
    }

    const signUp = async () => {
        const ret = await instance.post('/signup', { userName: userName, password: password })
        console.log(ret.data.message)
    }

    const clearAll = async () => {
        await instance.delete('/danger/clearAll')
    }
    return (
        <div className="App">
            <header className="App-header">
                <input id="input_userName" type="text" onChange={(e) => {setUserName(e.target.value)}}></input>
                <input id="input_password" type="text" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button id="b_login" onClick={login}>Login</button>
                <button id="b_signup" onClick={signUp}>Sign Up</button>
                <button id="b_clear" onClick={clearAll}>Clear All</button>
            </header>
        </div>
    );
}

export default App;
