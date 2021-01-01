import Account from "../models/account.js"
import RND2UID from "../models/RND2UID.js"

import { useState } from 'react'

async function GetUserInfo(req, res) {
	RND2UID
		.findOne({ RND: req.query.RND })
		.exec(function (err, mapping) {
			if (!mapping) {
				console.log("[Error]: Mapping not found!")
			} else {
				const UID = mapping.UID
				Account
					.findOne({ _id: UID })
					.exec(function (err, account) {
						if (!account) {
							console.log("[Error]: Fatal error - Account with UID not found!")
						} else {
							res.status(200).send((({userName, favorite, blacklist})=>
												  ({userName, favorite, blacklist}))(account))
							console.log("User Info sent")
						}
					})
			}
		})
}

export { GetUserInfo }