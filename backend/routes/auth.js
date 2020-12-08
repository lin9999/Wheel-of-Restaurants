import Account from "../models/account.js"

async function Authenticate(req, res) {
	const query = Account
					.findOne({ userName: req.body.userName })
					.exec(function(err, account) {
						console.log(account.password)
						console.log(req.body.password)
						if (req.body.password === account.password) {
							res.status(200).send({ message: "Login" })
						} else {
							res.status(200).send({ message: "Wrong password!"})
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