import './App.css';
import Login from './container/Login'
import WTF from './container/WTF'
import Development from './container/Development'
import { PieChartOutlined, HeartFilled, CopyrightOutlined, GithubOutlined } from '@ant-design/icons'
import Background from './components/Background'
import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { Button } from 'antd'

function App() {
    return (
        <React.Fragment>
			<Background/>
            <BrowserRouter>
				<Route exact path="/" component={Login} />
				<Route exact path="/WTF" component={WTF} /> 
				<Route exact path="/Development/Development" component={Development}></Route>
            </BrowserRouter>
			<h3 className="footer"> 
				<PieChartOutlined/> <br/> <CopyrightOutlined /> 2020 by WTF <br/> Proudly created with <HeartFilled />
			</h3>
			<h3 className="gitIcon">
				Give us a star: &nbsp; 
				<Button type="text" href="https://github.com/ChangOliver/Wheel-of-Restaurants" > 
					 <GithubOutlined/>
				</Button>
			</h3>
		</React.Fragment>
    );
}

export default App;