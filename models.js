exports = module.exports = function (app, mongoose) {

	require('./schemas/product')(app, mongoose);
	require('./schemas/category')(app, mongoose);
	require('./schemas/cart')(app, mongoose);

};