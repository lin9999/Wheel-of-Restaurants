import './WTF.css';
import './NormalLoginForm.css'
import { Button, InputNumber } from 'antd'
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { parse as cookieParser } from 'cookie'

import { instance } from './Util'
import Wheel from "./Wheel"
import WBList from './WBList'

const getFoodList = async (setFoodList, setListNum) => {
	const ret = await instance.get('/getRestaurantList')
	setFoodList(ret.data)	
	setListNum(ret.data.length)
}

const getFoodNameList = (foodList) => {
	if (foodList.length == 0) 
		return []
	return foodList.map(({ restaurantName, ...rest }) => (restaurantName))
}

function WTF() {
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [foodList, setFoodList] = useState([])
    const [listNum, setListNum] = useState(foodList.length)

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
        getFoodList(setFoodList, setListNum)
    }, [])

    return (
        <React.Fragment>
			<h1 id="Title">Hi, {(!user) ? "" : user.userName}<br/>Don't know what to eat?<br/>Let us decide for you!</h1>
			<div className="Wheel">
				{ 
					(foodList) ? <Wheel  items={getFoodNameList(foodList).slice(0, listNum)} /> : <div></div>
				}
			</div>
            <div className="Choices">
				<h3>Choices:</h3>
				<InputNumber min={1} max={foodList.length} value={listNum} onChange={(num) => {setListNum(num)}}/>
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
			<WBList classname="WBList"/>
			<div id="rectangle"></div>
		</React.Fragment>
    );
};

export default WTF;