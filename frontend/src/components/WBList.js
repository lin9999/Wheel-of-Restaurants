import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs;

function WBList(){
	return(
		<React.Fragment>
			<Tabs defaultActiveKey="1">
	    	<TabPane tab="All" key="1">
	      		Content of Tab Pane 1
	    	</TabPane>
	    	<TabPane tab="My Favorite" key="2">
	      		Content of Tab Pane 2
	    	</TabPane>
	    	<TabPane tab="My Black List" key="3">
	      		Content of Tab Pane 3
	    	</TabPane>
	  		</Tabs>
		</React.Fragment>
	);
}

export default WBList;