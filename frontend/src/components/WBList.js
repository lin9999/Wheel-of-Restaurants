import React from 'react'
import { Tabs, List, Button } from 'antd'
import SearchBar from './SearchBar' 
import './WBList.css'


function WBList(){

	const { TabPane } = Tabs;

	const data = [
		{
			title: 'Ant Design Title 1',
		},
		{
			title: 'Ant Design Title 2',
		},
		{
			title: 'Ant Design Title 3',
		},
		{
			title: 'Ant Design Title 4',
		},
		{
			title: 'Ant Design Title 5',
		},	
		{
			title: 'Ant Design Title 6',
		},	
		{
			title: 'Ant Design Title 7',
		},	
		{
			title: 'Ant Design Title 8',
		},																		
	];

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
								<List.Item key={item.id}>
									<List.Item.Meta
										title={<a href="">{item.title}</a>}
										description="description"
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
								<List.Item key={item.id}>
									<List.Item.Meta
										title={<a href="">{item.title}</a>}
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
								<List.Item key={item.id}>
									<List.Item.Meta
										title={<a href="">{item.title}</a>}
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