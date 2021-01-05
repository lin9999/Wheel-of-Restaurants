import Restaurant from '../models/restaurant'
import Account from "../models/account.js"
import RND2UID from "../models/RND2UID.js"

async function addNewRestaurant(req, res) {
	const newRestaurant = req.body
	Restaurant.create(newRestaurant, function(err, account, next) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				console.log("[Error]: Restaurant existed!")
				res.status(200).send({ message: "Restaurant existed!" })
			}
			console.log(err)
		} else {
			console.log("[Create]: " + JSON.stringify(newRestaurant))
			res.status(200).send({ message: "Success" })						
		}
	})
}

async function ClearUsers(req, res) {
	Account.remove({}, function(err) { 
	   console.log('[Warning]: \"Account\" collection removed') 
	});
	RND2UID.remove({}, function(err) { 
	   console.log('[Warning]: \"RND2UID\" collection removed') 
	});
}

async function ClearRestaurants(req, res) {
	Restaurant.remove({}, function(err) { 
	   console.log('[Warning]: \"Restaurant\" collection removed') 
	});
}

async function getRestaurantList(req, res) {
	Restaurant
		.find({})
		.exec(function(err, restaurants) {
			res.status(200).send(restaurants)
		})
}

export { addNewRestaurant, ClearUsers, ClearRestaurants, getRestaurantList }