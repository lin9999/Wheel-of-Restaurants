import React from 'react'
import { Tabs } from 'antd'
import SearchBar from './SearchBar' 
import './WBList.css'



function WBList(){

	const { TabPane } = Tabs;

	return(
		<React.Fragment>
			<Tabs type="card" className="Tabs" defaultActiveKey="1" >
		    	<TabPane className="TabPane" tab="All" key="1">
		    		<SearchBar className="SearchBar"/>
		      		Content of Tab Pane 1<br/>
		      		Content of Tab Pane 1<br/>
		      		Content of Tab Pane 1<br/>
		      		Content of Tab Pane 1<br/>
		      		Content of Tab Pane 1
		    	</TabPane>
		    	<TabPane className="TabPane" tab="My Favorite" key="2">
		      		<SearchBar className="SearchBar"/>
		      		Content of Tab Pane 2<br/>
		      		Content of Tab Pane 2<br/>
		      		Content of Tab Pane 2<br/>
		      		Content of Tab Pane 2<br/>
		      		Content of Tab Pane 2
		    	</TabPane>
		    	<TabPane className="TabPane" tab="My Black List" key="3">
		    		<SearchBar className="SearchBar"/>
		      		Content of Tab Pane 3<br/>
		      		Content of Tab Pane 3<br/>
		      		Content of Tab Pane 3<br/>
		      		Content of Tab Pane 3<br/>
		      		Content of Tab Pane 3
		    	</TabPane>
	  		</Tabs>
		</React.Fragment>
	);
}

export default WBList;