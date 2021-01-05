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
    const [foodList, setFoodList] = useState(null)
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

    return (
        <React.Fragment>
			<h1 id="Title">Hi, {(!user) ? "" : user.userName}<br/>Don't know what to eat?<br/>Let us decide for you!</h1>
			<div className="Wheel">
				{ 
					(foodList) ? <Wheel items={getFoodNameList(foodList).slice(0, listNum)} /> : <div></div>
				}
			</div>
            <div className="Choices">
				<h3>Choices:</h3>
				<InputNumber min={1} max={foodList ? foodList.length : 0} value={listNum} onChange={(num) => {setListNum(num)}}/>
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
			<WBList classname="WBList" foodList={foodList}/>
			<div id="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.3521692584786!2d121.53938181483393!3d25.022119983977902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa28bc175111%3A0xfc0c286ca63e50b8!2z6Z-T5Zac5aCC!5e0!3m2!1szh-TW!2stw!4v1609229705316!5m2!1szh-TW!2stw" 
                        width="450" 
                        height="600"
                        frameborder="100">
                </iframe>
            </div>
		</React.Fragment>
    );
};

export default WTF;