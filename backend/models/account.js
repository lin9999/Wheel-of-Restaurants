import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AccountSchema = Schema({
		UID: { type: Number, required: true, unique: true },
		userName: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	}, {
		collection: 'Account',
		timestamps: { createdAt: 'created_at'}
	})

const exportSchema = mongoose.model('Account', AccountSchema)

export default exportSchema
