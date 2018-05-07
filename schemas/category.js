
module.exports = function (app, mongoose) {
	var categoriesSchema = mongoose.Schema({
		"_id": {
			type: String
		},
		"categoryName": {
			type: String
		}
	});

	var categories = mongoose.model('categories', categoriesSchema);
	app.schema.categories = categories;
};