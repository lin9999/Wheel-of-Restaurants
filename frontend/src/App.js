import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
        baseURL: API_ROOT
})

function App() {
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        await instance.post('/auth', { account: account, password: password })
        console.log("OK")
    }

    const signUp = async() => {
        const ret = await instance.post('/signup', { account: account, password: password })
        console.log(ret)
    }

    return (
        <div className="App">
            <header className="App-header">
                <input id="input_account" type="text" onChange={(e) => {setAccount(e.target.value)}}></input>
                <input id="input_password" type="text" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button id="b_login" onClick={login}>Login</button>
                <button id="b_signup" onClick={signUp}>Sign Up</button>
            </header>
        </div>
    );
}

export default App;
