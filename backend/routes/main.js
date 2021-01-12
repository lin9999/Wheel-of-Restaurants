import Account from "../models/account.js"

import { useState } from 'react'

async function GetUserInfo(req, res) {
	const UID = req.query.UID
	Account
		.findOne({ _id: UID })
		.exec(function (err, account) {
			if (!account) {
				console.log("[Error]: Fatal error - Account with UID not found!")
				res.status(200).send({ message: "Something went wrong... "})
			} else {
				res.status(200).send({ message: "Success", 
									   userInfo: (({userName, favorite, blacklist})=>
									  			 ({userName, favorite, blacklist}))(account)})
				console.log("User Info sent")
			}
		})
}

async function UpdateWBList(req, res) {
	const UID = req.body.UID
	Account
		.update({ _id: UID },
				{ favorite: req.body.favorite, blacklist: req.body.blacklist},
				function(err, log) {
					if (err) {
						console.log(err)
					} else {
						res.status(200).send({ message: "Success" })
					}
				})
}

export { GetUserInfo, UpdateWBList }