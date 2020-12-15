import Account from "../models/account.js"

async function Authenticate(req, res) {
	console.log(req.body)
	const query = Account
					.findOne({ userName: req.body.userName })
					.exec(function(err, account) {
						try {
							if (!account)
								throw new Error("No such user!")
							if (req.body.password === account.password) {
								console.log("Login")
								res.status(200).send({ message: "Login" })
							} else {
								console.log("Wrong")
								res.status(200).send({ message: "Wrong password!"})
							}
						} catch (error) {
							console.log(error)
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
						if (userWithMaxID === null) {
							req.body.UID = 0
						} else {
							req.body.UID = userWithMaxID.UID + 1
						}
						Account.create(newAccount, function(err, account, next) {
							if (err) {
								if (err.name === 'MongoError' && err.code === 11000)
									res.status(200).send({ message: "User name existed" })
							} else {
								console.log("create User: " + JSON.stringify(newAccount))
								res.status(200).send({ message: "User account has been created" })						
							}
						})
					}) 
}

async function ClearAll(req, res) {
	Account.remove({}, function(err) { 
	   console.log('collection removed') 
	});
}

export { Authenticate, SignUp, ClearAll }