import Account from "../models/account.js"
import RND2UID from "../models/RND2UID.js"

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
				if (req.body.password === account.password) {
					console.log("[Login]: User " + account.userName + " is logged in")
					const newMapping = { RND: genRND(), UID: account.UID }
					
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
	Account
		.findOne({})
		.sort('-UID')
		.exec(function(err, userWithMaxID) {
			const newAccount = req.body
			if (!userWithMaxID) {
				req.body.UID = 0
			} else {
				req.body.UID = userWithMaxID.UID + 1
			}

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
		}) 
}

async function ClearAll(req, res) {
	Account.remove({}, function(err) { 
	   console.log('[Warning]: \"Account\" collection removed') 
	});
	RND2UID.remove({}, function(err) { 
	   console.log('[Warning]: \"RND2UID\" collection removed') 
	});
}

export { Authenticate, SignUp, ClearAll }