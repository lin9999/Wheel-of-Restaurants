import './App.css';
import Login from './container/Login'
import WTF from './container/WTF'
import Development from './container/Development'
import { PieChartOutlined, HeartFilled, CopyrightOutlined, GithubOutlined, StarFilled } from '@ant-design/icons'
import Background from './components/Background'
import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { Button } from 'antd'
import ChangOliver from './imgs/ChangOliver.png'
import lin9999 from './imgs/lin9999.png'
import vincent861223 from './imgs/vincent861223.png'

function App() {
    return (
        <React.StrictMode>
			<Background/>
            <BrowserRouter>
				<Route path="/" component={Login} />
				<Route exact path="/WTF" component={WTF} /> 
				<Route exact path="/Development/Development" component={Development}></Route>
            </BrowserRouter>
			<h3 className="footer"> 
				<PieChartOutlined/> <br/> <CopyrightOutlined /> 2020 by WTF <br/> Proudly created with <HeartFilled />
			</h3>
			<h3 className="gitIcon">
				Give us a <StarFilled />: &nbsp; 
				<Button 
					icon = {<GithubOutlined/>}
					type="text"  
					shape="circle" 
					size="large"
					href="https://github.com/ChangOliver/Wheel-of-Restaurants"
					target = "_blank" />
				<br/>
				WTF Team: &nbsp;
				<Button type="text" shape="circle" href="https://github.com/ChangOliver/" target="_blank">
					<img src = {ChangOliver} alt = "ChangOliver" style={{"borderRadius":"50%"}}/> 
				</Button>
				<Button type="text" shape="circle" href="https://github.com/lin9999" target="_blank">
					<img src = {lin9999} alt = "lin9999" style={{"borderRadius":"50%"}}/> 
				</Button>
				<Button type="text" shape="circle" href="https://github.com/vincent861223" target="_blank">
					<img src = {vincent861223} alt = "vincent861223" style={{"borderRadius":"50%"}}/> 
				</Button>
			</h3>
		</React.StrictMode>
    );
}

export default App;