import './App.css';
import NormalLoginForm from './components/NormalLoginForm'
import {PieChartOutlined, HeartOutlined, CopyrightOutlined, GithubOutlined} from '@ant-design/icons'
import React from 'react'
import background from './imgs/background.png'

function App() {
	return (
		<React.Fragment>
			<img className="background" src={background} alt="Background"/>  
			<div>
				<NormalLoginForm></NormalLoginForm>
			</div> 
			<div>
				
			</div>
			<h3 className="footer"> 
				<PieChartOutlined/> <br/> <CopyrightOutlined /> 2020 by WTF <br/> Proudly created with <HeartOutlined />
			</h3>
			<h3 className="gitIcon">
				Follow us: &nbsp;<GithubOutlined /> <GithubOutlined /> <GithubOutlined />
			</h3>
		</React.Fragment>
	);
}

export default App;