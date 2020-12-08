import { Authenticate, SignUp } from "./auth.js"

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
	app.post('/api/signup', wrap(SignUp))
    app.post('/api/auth', wrap(Authenticate))
}	

export default main
