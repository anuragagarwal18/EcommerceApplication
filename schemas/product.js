
module.exports = function (app, mongoose) {

	var productSchema = mongoose.Schema({
		"_id": {
			type: String
		},
		"ProductId": {
			type: String
		},
		"ProductName": {
			type: String
		},
		"CategoryId": {
			type: Number
		},
		"QuantityPerUnit": {
			type: Number
		},
		"UnitPrice": {
			type: Number
		},
		"UnitInStock": {
			type: Number
		},
		"lastUpdated": {
			type: Date
		},
		"brand": {
			type: String
		},
		"imagesUrl": {
			type: String
		}

	});

	var products = mongoose.model('products', productSchema);
	app.schema.products = products;
};
