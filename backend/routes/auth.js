import Account from "../models/account.js"

async function Authenticate(req, res) {
	console.log(req.body)
	res.status(200).send({ message: 'OK' })
}

async function SignUp(req, res) {
	console.log(req.body)
	res.status(200).send({ message: 'OK' })
}

export { Authenticate, SignUp }