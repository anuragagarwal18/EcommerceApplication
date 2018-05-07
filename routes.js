module.exports = function (app) {
    app.get('/getItems', require('./rest_api/index').getItems);
    app.put('/addItemsToCart/', require('./rest_api/index').addItemsToCart);
    app.get('/getCartDetails/:userId', require('./rest_api/index').getCartDetails);
    app.put('/removeItemFromCart/', require('./rest_api/index').removeItemFromCart);
};