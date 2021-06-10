import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AccountSchema = Schema({
		userName: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		favorite: [{ type: String }],
		blacklist: [{ type: String }],
		recentVisit: [{ type: String }],
	}, {
		_id: true,
		collection: 'Account',
		timestamps: { createdAt: 'created_at'}
	})

const exportSchema = mongoose.model('Account', AccountSchema)

export default exportSchema
