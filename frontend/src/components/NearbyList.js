import './NearbyList.css'
import { Tabs, List, Button } from 'antd'
import React, { useState, useEffect} from 'react'

import { getUrl } from './Util'

function NearbyList(props) {
	const { foodListState, setSelectedRestaurant } = props
	const [position, setPosition] = useState(null)
	const [foodList, setFoodList] = useState([])
	const [showList, setShowList] = useState(false)

	useEffect(() => {
		if (foodListState.foodListLoaded) {
			setFoodList(foodListState.foodList)
		}
	}, [foodListState.foodListLoaded])

    useEffect(() => {
    	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    }, [props.refresh])

    useEffect(() => {
    	if (position && foodList) {
	    	let newList = foodList
	    	newList.forEach((restaurant) => {
	    		restaurant.distance = parseInt(getDistance(position, getCoordFromURL(getUrl(foodList, restaurant._id))))
	    	})
	    	newList.sort((a, b) => (a.distance - b.distance))
	    	setFoodList(newList)
	    	setShowList(true)
    	}
    }, [position])

	const geolocationSuccess = (position) => {
		setPosition({ lon: position.coords.longitude, lat: position.coords.latitude })
	}

	const geolocationError = (err) => {
	    console.log(err);
	    alert('Something went wrong... You need to allow for it to run!');
	}

	const getCoordFromURL = (url) => {
		const splitStr = url.split("!")
		const lon = splitStr.filter((str) => (str.startsWith("2d")))[0].substr(2)
		const lat = splitStr.filter((str) => (str.startsWith("3d")))[0].substr(2)
	    return {lon: lon, lat: lat}
	}

	const getDistance = (p1, p2) => {
	    let R = 6371; // Radius of the earth in km
	    let dLat = deg2rad(p2.lat-p1.lat);  // deg2rad below
	    let dLon = deg2rad(p2.lon-p1.lon); 
	    let a = 
	        Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) * 
	        Math.sin(dLon/2) * Math.sin(dLon/2);

	    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	    let d = R * c * 1000; // Distance in km
	    return d;
	}

	function deg2rad(deg) {
	  return deg * (Math.PI/180)
	}

    return (
    	<div>
	    	<nav className="NearbyNav">
			<List
				dataSource={(foodListState.foodListLoaded && showList) ? 
					foodList :
					[]
				}
				size="small"
				renderItem={item => (
					<List.Item key={item._id}>
						<List.Item.Meta
							title={ <button type="button" className="link-button" onClick={() => {setSelectedRestaurant(item._id)}}>{item.restaurantName}</button> }
							description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag + ", " + item.distance + "m"}
						/>
					</List.Item>
				)}
			/> 
			</nav>
		</div>  
    ); 

};

export default NearbyList;