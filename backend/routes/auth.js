import Account from "../models/account.js"
import Rnd2UID from "../models/rnd2UID.js"

function genRND() {
	return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function Authenticate(req, res) {
	// console.log(req.body)
	const query = Account
					.findOne({ userName: req.body.userName })
					.exec(async function(err, account) {
						try {
							if (!account)
								throw new Error("No such user!")
							if (req.body.password === account.password) {
								console.log("[Login]: User " + account.userName + " is logged in")
								const newMapping = { RND: genRND(), UID: account.UID }
								Rnd2UID.create(newMapping, function(err, mapping, next) {
									if (err) {
										if (err.name === 'MongoError' && err.code === 11000)
											console.log("[Error]: RND conflict!")
											res.status(200).send({ message: "Something went wrong..." })
									} else {
										console.log("[Mapping]: " + JSON.stringify(newMapping))
									}
								})
								await 
								res.status(200).send({ message: "Login", RND: newMapping.RND})
							} else {
								console.log("[Error]: Wrong password")
								res.status(200).send({ message: "Wrong password!"})
							}
						} catch (e) {
							console.log("[Error]: " + e.message)
							res.status(200).send({ message: "No such user!"})
						}
					})
}

async function SignUp(req, res) {
	const query = Account
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
									res.status(200).send({ message: "User name existed" })
							} else {
								console.log("[Create]: " + JSON.stringify(newAccount))
								res.status(200).send({ message: "User account has been created" })						
							}
						})
					}) 
}

async function ClearAll(req, res) {
	Account.remove({}, function(err) { 
	   console.log('[Warning]: \"Account\" collection removed') 
	});
	Rnd2UID.remove({}, function(err) { 
	   console.log('[Warning]: \"Rnd2UID\" collection removed') 
	});
}

export { Authenticate, SignUp, ClearAll }