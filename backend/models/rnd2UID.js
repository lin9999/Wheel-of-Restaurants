import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RND2UID = Schema({
		RND: { type: String, required: true, unique: true },
		UID: { type: String, required: true}
	}, {
		collection: 'RND2UID_mapping',
		timestamps: { createdAt: 'created_at'}
	})

const exportSchema = mongoose.model('RND2UID', RND2UID)

export default exportSchema
