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
  	<body>
	  	<div className="TitleBlock">
	  		<div className="TextBlock">
				<h1 className="titleCap" id="W">W</h1>
		  		<h1 className="titleLow" id="here">here's</h1>
		  	</div>
	  		<div className="TextBlock">
				<h1 className="titleCap" id="T">T</h1>
		  		<h1 className="titleLow" id="o">he</h1>
		  	</div>
	  		<div className="TextBlock">
				<h1 className="titleCap" id="F">F</h1>
		  		<h1 className="titleLow" id="east">ood</h1>
		  	</div>		  		  	
		</div>
		<div className="Form">
			<NormalLoginForm></NormalLoginForm>
		</div>
		<div className="LeftBlock"></div>
		<div className="FooterBlock"></div>
	</body>
    );
}

export default App;
