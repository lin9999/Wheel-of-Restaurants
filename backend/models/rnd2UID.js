import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Rnd2UID = Schema({
		RND: { type: Number, required: true, unique: true }
		UID: { type: Number, required: true},
	}, {
		collection: 'Rnd2UID mapping',
		timestamps: { createdAt: 'created_at'}
	})

const exportSchema = mongoose.model('Rnd2UID', Rnd2UID)

export default exportSchema
