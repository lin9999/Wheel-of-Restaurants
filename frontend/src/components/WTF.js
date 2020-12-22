import './NormalLoginForm.css'
import { Button } from 'antd'
import { } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import wheel from '../imgs/wheel.png'
import { useLocation, useHistory } from 'react-router-dom';
import { parse as cookieParser} from 'cookie'

import User from '../classes/User.js'

import Wheel from "./Wheel"



const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
    baseURL: API_ROOT
})



function WTF() {
	const history = useHistory()
	const [user, setUser] = useState(null)

	const logout = () => {
		sessionStorage.removeItem('user')
		history.push({
			pathname: "/"
		})
	}

	useEffect(() => {
	    const loggedInUser = sessionStorage.getItem('user');
	    if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
	    } else { // redirect to login page
	    	alert("Please log in first!")
	    	history.push({
	    		pathname: "/"
	    	})
	    }
	}, [])
	return(
		<React.Fragment>
			<h1>Hi, {(!user) ? "" : user.userName}</h1>
			<Button type="primary" onClick={logout}>LOGOUT</Button>
			<Wheel items={['Pizzas', 'Sandwiches', 'Salads', 'a', 'b', 'c']} />

		</React.Fragment>
	);
};

export default WTF;