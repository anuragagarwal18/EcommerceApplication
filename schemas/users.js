'use strict';
module.exports = function (app, mongoose) {
	var userSchema = mongoose.Schema({
		// Ids
		"_id": Number,
		// Basic Fields
		"name": {
			type: String,
			default: ''
		},
		"phone": {
			type: String,
			unique: true
		},
		"email": {
			type: String,
			default: ''
		},

		"hashedPassword": {
			type: String,
			select: false
		}, // For Password
		"salt": {
			type: String,
			select: false
		}, // For Password
		"userVerified": {
			type: Boolean,
			default: true
		}

	});

	var users = mongoose.model('users', userSchema);
	app.schema.users = users;
};