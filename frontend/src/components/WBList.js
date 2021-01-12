import './WBList.css'
import React, { useState, useEffect} from 'react'
import { Tabs, List, Button } from 'antd'
import SearchBar from './SearchBar' 
import { displayStatus } from './Util'
function WBList(props) {
	const { TabPane } = Tabs;
	const [foodList, setFoodList] = useState([])
	const [user, setUser] = useState(null)
	const [searchWord, setSearchWord] = useState("")

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
			if (user.blacklist.includes(restaurantID)) {
				displayStatus({
	        		type: 'error', 
	        		msg: 'I thought you hate it...'
	        	})
			} else if (!user.favorite.includes(restaurantID)) {
				const updatedUser = {...user, favorite: [restaurantID, ...user.favorite]}
				setUser(updatedUser)
				props.handleUserWBListUpdate(updatedUser)
			}
		} else if (listName === 'blacklist') {
			if (user.favorite.includes(restaurantID)) {
				displayStatus({
	        		type: 'error', 
	        		msg: 'I thought it is your favorite...'
	        	})
			} else if (!user.blacklist.includes(restaurantID)) {
				const updatedUser = {...user, blacklist: [restaurantID, ...user.blacklist]}
				setUser(updatedUser)
				props.handleUserWBListUpdate(updatedUser)
			}
		}
	}
	const removeFromList = (listName, restaurantID) => {
		if (listName === 'favorite') {
			if (user.favorite.includes(restaurantID)) {
				const updatedUser = {...user, favorite: user.favorite.filter((favoriteID) => { return favoriteID !== restaurantID})}
				setUser(updatedUser)
				props.handleUserWBListUpdate(updatedUser)
			}
		} else if (listName === 'blacklist') {
			if (user.blacklist.includes(restaurantID)) {
				const updatedUser = {...user, blacklist: user.blacklist.filter((blacklistID) => { return blacklistID !== restaurantID})}
				setUser(updatedUser)
				props.handleUserWBListUpdate(updatedUser)
			}
		}
	}


	return(
		<React.Fragment>
			<Tabs type="card" className="Tabs" defaultActiveKey="1" onTabClick={() => {setSearchWord("")}}>
				<TabPane className="TabPane" tab="All" key="1" >
					<SearchBar className="SearchBar" searchWord={searchWord} setSearchWord={setSearchWord}/>
					<nav>
						<List
							dataSource={(props.foodListState.foodListLoaded) ? 
								foodList.filter((restaurant) => (restaurant.restaurantName.includes(searchWord))) : 
								[]}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href={item.googleurl} target="_blank" rel="noreferrer noopener"> {item.restaurantName} </a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
									<Button size="small" shape="round" type="primary" onClick={() => {props.toggleWheel(item._id)}} style={(item.addedToWheel)? {"background":"#da3768"}:{"background":"#994aff82"}}>Wheel</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {addToList('favorite', item._id)}} disabled={user.favorite.includes(item._id)}>Favorite</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {addToList('blacklist', item._id)}} style={{"background":"gray"}} disabled={user.blacklist.includes(item._id)}>BlackList</Button>								
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Favorite" key="2">
					<SearchBar className="SearchBar" searchWord={searchWord} setSearchWord={setSearchWord}/>
					<nav>
						<List
							dataSource={(props.foodListState.foodListLoaded && props.userState.userLoaded) ? 
								foodList.filter((restaurant) => user.favorite.includes(restaurant._id) && restaurant.restaurantName.includes(searchWord)) :
								[]
							}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href={item.googleurl} target="_blank" rel="noreferrer noopener"> {item.restaurantName} </a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
                                    <Button size="small" shape="round" type="primary" style={(item.addedToWheel)? {"background":"#da3768"}:{"background":"#994aff82"}} onClick={() => props.toggleWheel(item._id)}>Wheel</Button>
									<Button size="small" shape="round" type="primary" onClick={() => {removeFromList('favorite', item._id)}} style={{"background":"red"}}>Remove</Button>
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Black List" key="3">
					<SearchBar className="SearchBar" searchWord={searchWord} setSearchWord={setSearchWord}/>
					<nav>
						<List
							dataSource={(props.foodListState.foodListLoaded && props.userState.userLoaded) ? 
								foodList.filter((restaurant)=> (user.blacklist.includes(restaurant._id) && restaurant.restaurantName.includes(searchWord) )) :
								[]
							}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href={item.googleurl} target="_blank" rel="noreferrer noopener"> {item.restaurantName} </a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
                                    <Button size="small" shape="round" type="primary" style={(item.addedToWheel)? {"background":"#da3768"}:{"background":"#994aff82"}} onClick={() => props.toggleWheel(item._id)}>Wheel</Button>
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