import Account from "../models/account.js"
import RND2UID from "../models/RND2UID.js"
import bcrypt from "bcryptjs"

function genRND() {
	return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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
					const newMapping = { RND: genRND(), UID: account._id }
					
					RND2UID.create(newMapping, function(err, mapping, next) {
						if (err) {
							if (err.name === 'MongoError' && err.code === 11000)
								console.log("[Error]: RND conflict!")
								res.status(200).send({ message: "Something went wrong... please sign up again." })
						} else {
							console.log("[Mapping]: " + JSON.stringify(newMapping))
						}
					})
					await 
					res.status(200).send({ message: "Success", RND: newMapping.RND})
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