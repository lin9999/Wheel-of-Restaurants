import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RestaurantSchema = Schema({
		restaurantName: { type: String, required: true, unique: true },
		googleurl: { type: String, required: true}, 
		mapurl: { type: String, required: true },
		address: { type: String, required: true, unique: true},
		regionTag: { type: String },
		categoryTag: { type: String },
		priceTag: { type: String } ,
	}, {
		_id: true,
		collection: 'Restaurant',
	})

const exportSchema = mongoose.model('Restaurant', RestaurantSchema)

export default exportSchema
