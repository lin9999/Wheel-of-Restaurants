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
	return foodList.map(({ _id, restaurantName, ...rest }) => ({_id, restaurantName}))
}

function WTF() {
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [userLoaded, setUserLoaded] = useState(false)
    const [foodList, setFoodList] = useState(null)
    const [foodListLoaded, setFoodListLoaded] = useState(false)
    const [listNum, setListNum] = useState(0)
    const [selected, setSelected] = useState(0)

    const logout = () => {
        sessionStorage.removeItem('user')
        history.push({
            pathname: "/"
        })
    }

    const onSelect = (selectedItem) => {
        setSelected(selectedItem)
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
				<h3>Choices: </h3>
                <InputNumber min={1} max={(foodListLoaded) ? foodList.length : 0} value={listNum} onChange={(num) => {setListNum(num)}}/>
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
            <WBList classname="WBList" foodListState={{foodList: foodList, foodListLoaded: foodListLoaded}} userState={{user: user, userLoaded: userLoaded}} handleUserUpdate={handleUserUpdate} />
			<div id="map">
                <iframe src={(foodList) ? foodList[selected].mapurl : ""}
                        width="450" 
                        height="600"
                        frameBorder="10">
                </iframe>
            </div>
		</React.Fragment>
    );
};

export default WTF;