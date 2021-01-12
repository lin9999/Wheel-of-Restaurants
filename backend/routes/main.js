import Account from "../models/account.js"
import RND2UID from "../models/RND2UID.js"

import { useState } from 'react'

async function GetUserInfo(req, res) {
	RND2UID
		.findOne({ RND: req.query.RND })
		.exec(function (err, mapping) {
			if (!mapping) {
				console.log("[Error]: Mapping not found!")
				res.status(200).send({ message: "Mapping not found!" })
			} else {
				const UID = mapping.UID
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
		})
}

async function UpdateWBList(req, res) {
	RND2UID
		.findOne({ RND: req.body.RND })
		.exec(function (err, mapping) {
			if (!mapping) {
				console.log("[Error]: Mapping not found")
				res.status(200).send({ message: "Mapping not found!" })
			} else {
				const UID = mapping.UID
				Account
					.update({ _id: UID },
							{ favorite: req.body.favorite, blacklist: req.body.blacklist},
							function(err, log) {
								if (err) {
									console.log(err)
								} else {
									console.log(log)
								}
							})
			}
		})
}

export { GetUserInfo, UpdateWBList }