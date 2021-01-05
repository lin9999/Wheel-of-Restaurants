import './WTF.css'
import { Button, InputNumber } from 'antd'
import React, { useState, useEffect } from 'react'
import { instance } from '../components/Util'
import { useLocation, useHistory } from 'react-router-dom'
import { parse as cookieParser } from 'cookie'

import Wheel from "../components/Wheel"
import WBList from '..//components/WBList'

const getFoodList = async (setFoodList, setListNum) => {
	const ret = await instance.get('/getRestaurantList')
	setFoodList(ret.data)	
}

const getFoodNameList = (foodList) => {
	if (foodList.length == 0) 
		return []
	return foodList.map(({ restaurantName, ...rest }) => (restaurantName))
}

function WTF() {
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [userLoaded, setUserLoaded] = useState(false)
    const [foodList, setFoodList] = useState(null)
    const [foodListLoaded, setFoodListLoaded] = useState(false)
    const [listNum, setListNum] = useState(0)

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

    useEffect(() => {
        if (userLoaded === false && user) {
            setUserLoaded(true)
        }
    }, [user])

    useEffect(() => {
        if (foodListLoaded === false && foodList) {
            setFoodListLoaded(true)
            setListNum(foodList.length)
        }
    }, [foodList])

    const handleUserUpdate = (uodatedUser) => {
        setUser(uodatedUser)
    }

    return (
        <React.Fragment>
			<h1 id="Title">Hi, {(!user) ? "" : user.userName}<br/>Don't know what to eat?<br/>Let us decide for you!</h1>
            <div className="Wheel">
				{ 
					(foodListLoaded) ? <Wheel  items={getFoodNameList(foodList).slice(0, listNum)} /> : <div></div>
				}
			</div>
            <div className="Choices">
				<h3>Choices:</h3>
				<InputNumber min={1} max={(foodListLoaded) ? foodList.length : 0} value={listNum} onChange={(num) => {setListNum(num)}}/>
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
			<WBList classname="WBList" foodListState={{foodList: foodList, foodListLoaded: foodListLoaded}} userState={{user: user, userLoaded: userLoaded}} handleUserUpdate={handleUserUpdate} />
			<div id="rectangle">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.5422750791413!2d121.52976981483384!3d25.01566478398093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a98b83382edb%3A0x6ddbabb446640066!2z5rKZ5Zey5aOr5aSa!5e0!3m2!1szh-TW!2stw!4v1609229253362!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" style={{border: 0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
		</React.Fragment>
    );
};

export default WTF;