import './WBList.css'
import React, { useState, useEffect} from 'react'
import { Tabs, List, Button } from 'antd'
import SearchBar from './SearchBar' 
import { instance } from './Util'
function WBList(props) {
	const { TabPane } = Tabs;
	const [foodList, setFoodList] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		if (props.foodListState.foodListLoaded) {
			setFoodList(props.foodListState.foodList)
		}
	}, [props.foodListState.foodListLoaded])

	useEffect(() => {
		if (props.userState.userLoaded) {
			setUser(props.userState.user)
		}
	}, [props.userState.userLoaded])

	const addToList = (listName, restaurantID) => {
		if (listName === 'favorite') {
			if (!user.favorite.includes(restaurantID))
				setUser({...user, favorite: [restaurantID, ...user.favorite]})
		} else if (listName === 'blacklist') {
			if (!user.blacklist.includes(restaurantID))
				setUser({...user, blacklist: [restaurantID, ...user.blacklist]})
		}
	}
	const removeFromList = (listName, restaurantID) => {
		if (listName === 'favorite') {
			if (user.favorite.includes(restaurantID))
				setUser({...user, favorite: user.favorite.filter((favoriteID) => { return favoriteID != restaurantID})})
		} else if (listName === 'blacklist') {
			if (user.blacklist.includes(restaurantID))
				setUser({...user, blacklist: user.blacklist.filter((blacklistID) => { return blacklistID != restaurantID})})
		}
	}

	useEffect(() => {
		if (props.userState.userLoaded) {
			props.handleUserUpdate(user)
		}
	}, [user])

	return(
		<React.Fragment>
			<Tabs type="card" className="Tabs" defaultActiveKey="1" >
				<TabPane className="TabPane" tab="All" key="1">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={props.foodListState.foodListLoaded ? foodList : []}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
									<Button size="small" shape="round" type="primary" onClick={() => {props.toggleWheel(item._id)}} style={{"background":"#994aff82"}}>Wheel</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {addToList('favorite', item._id)}}>Favorite</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {addToList('blacklist', item._id)}} style={{"background":"black"}}>BlackList</Button>								
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Favorite" key="2">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={(props.foodListState.foodListLoaded && props.userState.userLoaded) ? 
								foodList.filter((restaurant)=>{ return user.favorite.includes(restaurant._id) }) :
								[]
							}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
                                    <Button size="small" shape="round" type="primary" style={{"background":"#994aff82"}} onClick={() => props.toggleWheel(item._id)}>Wheel</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {removeFromList('favorite', item._id)}} style={{"background":"red"}}>Remove</Button>
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Black List" key="3">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={(props.foodListState.foodListLoaded && props.userState.userLoaded) ? 
								foodList.filter((restaurant)=>{ return user.blacklist.includes(restaurant._id) }) :
								[]
							}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
                                    <Button size="small" shape="round" type="primary" style={{"background":"#994aff82"}} onClick={() => props.toggleWheel(item._id)}>Wheel</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {removeFromList('blacklist', item._id)}} style={{"background":"red"}}>Remove</Button>								
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
			</Tabs>
		</React.Fragment>
	);
}
export default WBList;