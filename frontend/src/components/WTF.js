import './WTF.css';
import './NormalLoginForm.css'
import { Button, InputNumber } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom';
import { parse as cookieParser } from 'cookie'

import User from '../classes/User.js'
import Wheel from "./Wheel"
import WBList from './WBList'


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

    return (
        <React.Fragment>
			<h1 id="Title">Hi, {(!user) ? "" : user.userName}<br/>Don't know what to eat?<br/>Let us decide for you!</h1>
			<Wheel className="Wheel" items={['Pizzas', 'Sandwiches', 'Salads', 'a', 'b', 'c']} />
			<div className="Choices">
				<h3>Choices:</h3>
				<InputNumber min={1} max={10} defaultValue={3} />
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
			<WBList classname="WBList"/>
			<div id="rectangle"></div>
		</React.Fragment>
    );
};

export default WTF;