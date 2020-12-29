import React from 'react'
import './Background.css'
import cookie from '../imgs/cookie.png'

function Background(){
	return(
	<React.Fragment>
		<div className="TitleBlock">
			<div className="SmallSquare" id="W">
				<h1 className="SmallTitle">W</h1>
			</div>
			<div className="BigSquare" id="here">
				<h1 className="BigTitle">Here's</h1>
			</div>
			<div className="SmallSquare" id="T">
				<h1 className="SmallTitle">T</h1>
			</div>
			<div className="SmallSquare" id="F">
				<h1 className="SmallTitle">F</h1>
			</div>
			<div className="SmallSquare" id="oo">
				<img src={cookie} className="cookie"/>
				<img src={cookie} className="cookie"/>
			</div>
			<div className="SmallSquare" id="d">
				<h1 className="SmallTitle">d</h1>
			</div>
		</div>
		<div className="FormBlock"></div>
		<div className="LeftBlock"></div>
		<div className="FooterBlock"></div>
	</React.Fragment>

	);
}

export default Background	  		
