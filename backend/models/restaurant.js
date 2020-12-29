import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RestaurantSchema = Schema({
		RID: { type: Number, required: true, unique: true },
		restaurantName: { type: String, required: true, unique: true },
		googleurl: { type: String, required: true}, 
		mapurl: { type: String, required: true },
		address: { type: String, required: true, unique: true},
		regionTag: { type: String },
		categoryTag: { type: String },
		priceTag: { type: String } ,
	}, {
		collection: 'Restaurant',
	})

const exportSchema = mongoose.model('Restaurant', RestaurantSchema)

export default exportSchema
