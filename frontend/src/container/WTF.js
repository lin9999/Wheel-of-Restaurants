import './WTF.css'
import { Button, InputNumber } from 'antd'
import React, { useState, useEffect } from 'react'
import { instance, displayStatus, fadeOutEffect, geolocationSuccess, geolocationError } from '../components/Util'
import { useHistory } from 'react-router-dom'

import LogoutButton from '../components/LogoutButton'
import Wheel from "../components/Wheel"
import ReviewBar from "../components/Review"
import WBList from '../components/WBList'

const getFoodList = async (setFoodList) => {
    const ret = await instance.get('/getRestaurantList')
    const foodList = ret.data
    foodList.forEach((food) => {food.addedToWheel = false})
    setFoodList(foodList)   
}

const getFoodNameList = (foodList) => {
    if (foodList.length === 0) 
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
    const [selectedRestaurant, setSelectedRestaurant] = useState(0)
    const [showMap, setShowMap] = useState(false)
    const [showReview, setShowReview] = useState(true)

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
        getFoodList(setFoodList)
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
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

    useEffect(() => {
        if (!showMap)
            setTimeout(() => { setShowMap(true); setShowReview(true); }, 4000);
    }, [selectedRestaurant])

    const selectRestaurant = (selectedRestaurantItem) => {
        setSelectedRestaurant(selectedRestaurantItem)
    }

    const toggleWheel = (_id, option) => {
        if (!foodList) return
        const newFoodList = foodList.slice()
        const food = newFoodList.find((food) => food._id === _id)
        if (food) {
            if(option === "on") {
                food.addedToWheel = true
            } else if (option === "off") {
                food.addedToWheel = false
            } else {
                food.addedToWheel = !food.addedToWheel
            }
        }
        setFoodList(newFoodList)
        setListNum(foodList.filter((food) => food.addedToWheel).length)
    } 

    const handleUserWBListUpdate = async (updatedUser) => {
        setUser(updatedUser)
        const ret = await instance.post('/UpdateWBList', { UID: updatedUser.UID, favorite: updatedUser.favorite, blacklist: updatedUser.blacklist })
        if (ret.data.message === "Success") {
            sessionStorage.setItem('user', JSON.stringify(updatedUser))
        } else {
            displayStatus({
                type: 'error', 
                msg: 'failed to update WBList ...'
            })
        }
    }

    const handleUserVisitedUpdate = async (updatedUser) => {
        setUser(updatedUser)
        const ret = await instance.post('/UpdateVisitedList', { UID: updatedUser.UID, recentVisit: updatedUser.recentVisit })
        if (ret.data.message === "Success") {
            sessionStorage.setItem('user', JSON.stringify(updatedUser))
            fadeOutEffect('review', setShowReview);
        } else {
            displayStatus({
                type: 'error', 
                msg: 'failed to update VisitedList ...'
            })
        }
    }

    return (
        <React.Fragment>
            <h1 id="greetings">Hi, {(!user) ? "" : user.userName}<br/>Don't know what to eat?<br/>Let us decide for you!</h1>
            <LogoutButton></LogoutButton>
            <WBList classname="WBList" 
                    foodListState={{foodList: foodList, foodListLoaded: foodListLoaded}} 
                    userState={{user: user, userLoaded: userLoaded}} 
                    handleUserWBListUpdate={handleUserWBListUpdate} 
                    toggleWheel={toggleWheel}
                    setShowMap={setShowMap}
                    setSelectedRestaurant={setSelectedRestaurant}
            />
            <div className="Wheel">
                {(foodListLoaded) ? <Wheel  items={getFoodNameList(foodList.filter((food) => food.addedToWheel)).slice(0, listNum)} onSelect={selectRestaurant} setShowMap={setShowMap}/> : <div></div>}
            </div>
            {(showMap && selectedRestaurant) ? (
                    <React.Fragment>
                        <div id="map">
                            <iframe src={(foodList) ? foodList.find((food) => food._id === selectedRestaurant).mapurl : ""}
                                title="map"
                                width="450" 
                                height="600"
                                frameBorder="10">
                            </iframe>
                        </div>
                        {(showReview) ? (
                            <ReviewBar 
                                user={user}
                                selectedRestaurant={selectedRestaurant}
                                handleUserVisitedUpdate={handleUserVisitedUpdate}
                                setShowReview={setShowReview}
                            />) : (<React.Fragment></React.Fragment>)
                        }
                    </React.Fragment>
                ) : (<React.Fragment></React.Fragment>)
            }
        </React.Fragment>
    );
};

export default WTF;