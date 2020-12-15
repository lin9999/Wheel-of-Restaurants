import './App.css';
import NormalLoginForm from './components/NormalLoginForm'
import WTF from './components/WTF'
import {PieChartOutlined, HeartFilled, CopyrightOutlined, GithubOutlined} from '@ant-design/icons'
import background from './imgs/background.png'
import React, { useState } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom"


function App() {

	const [login, setLogin] = useState(false)

	return (
		<React.Fragment>
			<img className="background" src={background} alt="Background"/>  
            <BrowserRouter>
				<Route exact path="/" component={NormalLoginForm} />
				<Route path="/WTF" component={WTF} /> 
            </BrowserRouter>
			<div>
				
			</div>
			<h3 className="footer"> 
				<PieChartOutlined/> <br/> <CopyrightOutlined /> 2020 by WTF <br/> Proudly created with <HeartFilled />
			</h3>
			<h3 className="gitIcon">
				Follow us: &nbsp;<GithubOutlined /> <GithubOutlined /> <GithubOutlined />
			</h3>
		</React.Fragment>
	);
}

export default App;