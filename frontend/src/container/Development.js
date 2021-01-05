import { Button } from 'antd'

import React, { useState } from 'react'
import axios from 'axios'

import './Development.css'

const API_ROOT = 'http://localhost:4000/development'
const instance = axios.create({
    baseURL: API_ROOT
})

function Development() {
	const [restaurantName, setRestaurantName] = useState('')
	const [googleurl, setGoogleurl] = useState('')
	const [mapurl, setMapurl] = useState('')
	const [address, setAddress] = useState('')
	const [regionTag, setRegionTag] = useState([])
	const [categoryTag, setCategoryTag] = useState([])
	const [priceTag, setPriceTag] = useState([])

	const addNewRestaurant = async () => {
		if (!priceTag.match(/\${1,3}/)) {
			alert('$, $$, or $$$')
			return 
		}
		const ret = await instance.post('/addRestaurant', { 
			restaurantName: restaurantName, 
			googleurl: googleurl,
			mapurl: mapurl,
			address: address,
			regionTag: regionTag,
			categoryTag: categoryTag,
			priceTag: priceTag
		})
		console.log(ret)
	} 

	const clearUsers = async () => {
    	sessionStorage.removeItem('user')
        await instance.delete('/clearUsers')
    }

	const clearRestaurants = async () => {
        await instance.delete('/clearRestaurants')
    }

    const printCookie = () => {
    	alert(document.cookie)
    }

    const getRestaurantList = async () => {
    	const ret = await instance.get('/getRestaurantList')
    	console.log(ret.data)
    }

	return(
		<React.Fragment>
			<div className="formwrapper">
				<h1> Developer's Page</h1>
				<input placeholder="餐廳名稱" type="text" onChange={(e)=>{setRestaurantName(e.target.value)}}/>
				<input placeholder="Google連結" type="text" onChange={(e)=>{setGoogleurl(e.target.value)}}/>
				<input placeholder="地圖連結" type="text" onChange={(e)=>{setMapurl(e.target.value)}}/>
				<input placeholder="地址" type="text" onChange={(e)=>{setAddress(e.target.value)}}/>
				<input placeholder="地區Tag" type="text" onChange={(e)=>{setRegionTag(e.target.value)}}/>
				<input placeholder="種類Tag" type="text" onChange={(e)=>{setCategoryTag(e.target.value)}}/>
				<input placeholder="價格Tag" type="text" onChange={(e)=>{setPriceTag(e.target.value)}}/>
				<p>
					<Button type="primary" htmlType="submit" className="login-form-button" onClick={addNewRestaurant}>
						Add Restaurant!
					</Button>
				</p>
				<p>
					<Button type="danger" onClick={printCookie}>
						COOKIE
					</Button>
					<Button type="danger" onClick={getRestaurantList}>
						RESTAURANT LIST
					</Button>
				</p>
				<p>
					<Button type="danger" onClick={clearUsers}>
						CLEAR USERS
					</Button>
					<Button type="danger" onClick={clearRestaurants}>
						CLEAR RESTAURANTS
					</Button>
				</p>
			</div>
		</React.Fragment>
	)
}

export default Development;