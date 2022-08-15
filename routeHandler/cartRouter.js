const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cartSchema = require('../schemas/cartSchema');
const Cart = new mongoose.model("Cart", cartSchema);




router.post('/', async (req, res) => {
    const newCart = new Cart(req.body);

    await newCart.save((err) => {

        if (err) {
            res.status(500).json({
                error: `There was a server side error ${err}`,
            });

        } else {

            res.status(200).json({
                message: "Cart was inserted succesfully!",
            });
        }
    });

});
router.get("/:email", async (req, res) => {
    await Cart.find({ email: req.params.email })
        .select({
            __v: 0
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json(
                    data
                );
            }
        });
});
router.delete("/:id", async (req, res) => {
    await Cart.deleteOne({ id: req.params.id })
        .select({
            __v: 0
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json(
                    data
                );
            }
        });
});


module.exports = router;