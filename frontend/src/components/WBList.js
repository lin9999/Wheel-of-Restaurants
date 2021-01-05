import './WBList.css'
import React, { useState, useEffect} from 'react'
import { Tabs, List, Button } from 'antd'
import SearchBar from './SearchBar' 
import { instance } from './Util'
function WBList(props) {

	const { TabPane } = Tabs;
	const [data, setData] = useState([])
	useEffect(() => {
		if (props.foodList) {
			setData(props.foodList)
		}
	}, [props.foodList])
	return(
		<React.Fragment>
			<Tabs type="card" className="Tabs" defaultActiveKey="1" >
				<TabPane className="TabPane" tab="All" key="1">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={data}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description={item.priceTag + ", " + item.categoryTag + ", " + item.regionTag}
									/>
									<Button size="small" shape="round" type="primary" style={{"background":"#994aff82"}}>Wheel</Button>
									<Button size="small" shape="round" type="primary" >Favorite</Button>
									<Button size="small" shape="round" type="primary" style={{"background":"black"}}>BlackList</Button>								
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Favorite" key="2">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={data}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description="description"
									/>
									<Button size="small" shape="round" type="primary" style={{"background":"red"}}>Remove</Button>
								</List.Item>
							)}
						/>
					</nav>
				</TabPane>
				<TabPane className="TabPane" tab="My Black List" key="3">
					<SearchBar className="SearchBar"/>
					<nav>
						<List
							dataSource={data}
							size="small"
							renderItem={item => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={<a href="">{item.restaurantName}</a>}
										description="description"
									/>
									<Button size="small" shape="round" type="primary" style={{"background":"red"}}>Remove</Button>								
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