import './Review.css'
import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { fadeOutEffect } from './Util'

function Review(props) {
	const { selectedRestaurant, setShowReview } = props
	const [user, setUser] = useState(props.user)

	const handleYes = () => {
		const updatedUser = {...user}
		updatedUser.recentVisit = updatedUser.recentVisit.filter(ID => ID !== selectedRestaurant);
		updatedUser.recentVisit.unshift(selectedRestaurant);
		if (updatedUser.recentVisit.length > 5) {
			updatedUser.recentVisit.pop()
		}

		setUser(updatedUser)
		props.handleUserVisitedUpdate(updatedUser)
	}

	const handleNo = () => {
		fadeOutEffect('review', setShowReview)
	}

	return (
		<h1 id="review">
            Do you like this?<br/>
            <Button className="ReviewYes" type="primary" style={{ background: "green" }} onClick={handleYes}>YES</Button>
            <Button className="ReviewNo" type="primary" style={{ background: "red" }} onClick={handleNo}>NO</Button>
        </h1>
	);
};

export default Review;