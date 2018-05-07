module.exports = function (app, mongoose) {
	var cartSchema = mongoose.Schema({
		"userId": {
			type: Number,
			required: true,
			unique: true // user id is unique
		},
		"TotalItemsCount": {
			type: Number
		},
		"TotalCartValue": [{
			type: Number
		}],
		"lastItemAdded": {
			type: Number
		},
		"items": [{
			quantity: {
				type: Number,
				min: 0
			},
			pid: { type: mongoose.Schema.Types.String, ref: 'products' }

		}]
	});

	var carts = mongoose.model('carts', cartSchema);
	app.schema.carts = carts;
};
