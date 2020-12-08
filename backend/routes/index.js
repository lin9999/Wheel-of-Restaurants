import { Authenticate, SignUp, ClearAll } from "./auth.js"

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
	app.post('/api/signup', wrap(SignUp))
    app.post('/api/auth', wrap(Authenticate))
    app.delete('/api/danger/clearAll', wrap(ClearAll))
}	

export default main
