import Account from "../models/account.js"
import bcrypt from "bcryptjs"

async function Authenticate(req, res) {
	Account
		.findOne({ userName: req.body.userName })
		.exec(async function(err, account) {
			try {
				if (!account)
					throw new Error("No such user!")

				const cmpResult = await bcrypt.compare(req.body.password, account.password)
				if (cmpResult) {
					console.log("[Login]: User " + account.userName + " is logged in")
					res.status(200).send({ message: "Success", UID: account._id})
				} else {
					throw new Error("Wrong password!")
				}
			} catch (e) {
				console.log("[Error]: " + e.message)
				res.status(200).send({ message: e.message})
			}
		})
}

async function SignUp(req, res) {
	const newAccount = req.body
	newAccount.password = await bcrypt.hash(newAccount.password, 10)
	Account.create(newAccount, function(err, account, next) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000)
				console.log("[Error]: User name existed!")
				res.status(200).send({ message: "User name existed!" })
		} else {
			console.log("[Create]: " + JSON.stringify(newAccount))
			res.status(200).send({ message: "Success" })						
		}
	})
}

export { Authenticate, SignUp }