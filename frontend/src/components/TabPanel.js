import React from 'react'
import { Tabs, List, Checkbox } from 'antd'
import SearchBar from './SearchBar' 

function TabPanel({key, tab, data}) {

	const { TabPane } = Tabs;

	return(
		<React.Fragment>
			<TabPane className="TabPane" tab={tab} key={key}>
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
								<div>Content</div>
							</List.Item>
						)}
					/>
				</nav>
			</TabPane>
		</React.Fragment>
	)
}

export default TabPanel