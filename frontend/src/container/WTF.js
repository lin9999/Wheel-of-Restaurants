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
    const foodList = ret.data
    foodList.forEach((food) => {food.addedToWheel = false})
    setFoodList(foodList)   
    setListNum(foodList.filter((food) => food.addedToWheel).length)
}

const getFoodNameList = (foodList) => {
	if (foodList.length == 0) 
		return []
    return foodList.filter((food) => food.addedToWheel).map(({ _id, restaurantName, ...rest }) => ({_id, restaurantName}))
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

    const toggleWheel = (_id) => {
        const newFoodList = foodList.slice()
        const food = newFoodList.find((food) => food._id == _id)
        console.log(food)
        if(food){
            food.addedToWheel = !food.addedToWheel
        }
        setFoodList(newFoodList)
        setListNum(foodList.filter((food) => food.addedToWheel).length)
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
            setListNum(0)
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
                    (foodListLoaded) ? <Wheel  items={getFoodNameList(foodList).slice(0, listNum)} onSelect={onSelect} /> : <div></div>
				}
			</div>
            <div className="Choices">
				<h3>Choices: </h3>
                <InputNumber min={0} max={(foodListLoaded) ? getFoodNameList(foodList).length : 0} value={listNum} onChange={(num) => {setListNum(num)}}/>
			</div>
			<Button className="LOGOUT" type="primary" onClick={logout}>LOGOUT</Button>
            <WBList classname="WBList" foodListState={{foodList: foodList, foodListLoaded: foodListLoaded}} userState={{user: user, userLoaded: userLoaded}} handleUserUpdate={handleUserUpdate} toggleWheel={toggleWheel}/>
			<div id="map">
                {
                (selected)?
                <iframe src={(foodList) ? foodList.find((food) => food._id === selected).mapurl : ""}
                        width="450" 
                        height="600"
                        frameBorder="10">
                </iframe>
                : <div></div>
                }
            </div>
		</React.Fragment>
    );
};

export default WTF;