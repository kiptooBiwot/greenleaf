const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require('./redis.init')

module.exports = {
	signAccessToken: (savedEmployee) => {
		return new Promise((resolve, reject) => {
			(payload = {
				id: savedEmployee.id,
				role: savedEmployee.role,
			}),
				// console.log(payload)
				(secret = process.env.ACCESS_TOKEN_SECRET),
				(options = { expiresIn: "1m" });
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err);
					return reject(createError.InternalServerError());
				}
				resolve(token);
			});
		});
	},
	signRefreshToken: (savedEmployee) => {
		return new Promise((resolve, reject) => {
			(payload = {
				id: savedEmployee.id,
				role: savedEmployee.role,
			}),
				(secret = process.env.REFRESH_TOKEN_SECRET),
				(options = { expiresIn: "1y" });
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err);
					return reject(createError.InternalServerError());
				}
				// Store the refresh token in Redis server
				client.SET(savedEmployee.id, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
					if (err) {
						console.log(`An error occurs!`);
						reject(createError.InternalServerError());
						return;
					}
					resolve(token);
				});
			});
		})
	}
}
