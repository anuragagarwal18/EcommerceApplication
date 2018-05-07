'use strict'
var events = require('events');
exports.getItems = (req, res) => {
  req.app.schema.products.find({}, (err, docs) => {
    if (err) {
      return res.status(500).send({ data: {}, message: "Error Occured", res: false });
    } else {
      res.status(200).send({ data: docs, message: "success", res: true });
    }
  })
};

// This api will add the items in cart, if particular item is already added than it will send a response that item is already added in cart else it will add item in cart

exports.addItemsToCart = (req, res) => {
  const itemId = parseInt(req.body.itemId);
  const userId = parseInt(req.body.userId);
  const quantity = parseInt(req.body.quantity);
  const eventEmitter = new events.EventEmitter();

  eventEmitter.on('chekIfUserCartExists', function () {
    req.app.schema.carts.findOne({ 'userId': userId }, (err, data) => {
      if (err) {
        res.status(500).send({ data: data, message: "Error retrieving document from database with error", res: false })
      } else if (data === null) {
        req.app.schema.carts.create({
          userId: userId,
          items: [{ quantity: quantity, pid: itemId }]
        },
          (err, doc) => {
            if (err) {
              res.status(500).send({ data: {}, message: "Error Occured", res: false });
            } else {
              res.status(200).send({ data: doc, message: "Product Added to cart", res: true })
            }

          })
      } else {
        eventEmitter.emit('chekIfItemExists')
      }
    })

  });

  eventEmitter.on('chekIfItemExists', function () {
    req.app.schema.carts.findOne(
      { 'userId': userId, 'items.pid': itemId },
      (err, data) => {
        if (err) {
          res.status(500).send({ data: data, message: "Error retrieving document from database with error", res: false })
        } else if (data) {
          res.status(200).send({ data: data, message: "Product already exists in cart", res: false })
        } else {
          eventEmitter.emit('addItem')
        }
      })
  })

  eventEmitter.on('addItem', function () {
    req.app.schema.carts.findOneAndUpdate(
      { userId: userId },
      { $push: { items: { quantity: quantity, pid: itemId } } }, { new: true },
      (err, doc) => {
        if (err) {
          return res.status(500).send({ data: {}, message: "Error Occured", res: false });
        } else {
          res.status(200).send({ data: doc, message: "Product Added to cart", res: true })
        }
      })
  })

  eventEmitter.emit('chekIfUserCartExists');
}

// This api fetches card detaits for particular user
exports.getCartDetails = (req, res) => {
  const userId = parseInt(req.params.userId);
  let populateDoc = {
    path: 'items.pid'
  };
  req.app.schema.carts.findOne({ userId: userId }).populate(populateDoc).exec(function (err, doc) {
    if (err) {
      return res.status(500).send({ data: {}, message: "Error Occured", res: false });
    }
    return res.status(200).send({ data: doc, message: "Success", res: true });
  })
};

// Remove Item from cart based in itemId

exports.removeItemFromCart = (req, res) => {
  const itemId = parseInt(req.body.itemId);
  const userId = parseInt(req.body.userId);
  req.app.schema.carts.findOneAndUpdate(
    { userId: userId },
    { "$pull": { items: { "pid": itemId } } }, { new: true },
    (err, data) => {
      if (err) {
        return res.status(500).send({ data: {}, message: "Error Occured", res: false });
      } else {
        return res.status(200).send({ data: data, message: "Successfully removed", res: true });
      }
    })
}




