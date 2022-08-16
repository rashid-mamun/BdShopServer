const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cartSchema = require('../schemas/cartSchema');
const Cart = new mongoose.model("Cart", cartSchema);

const { logger } = require('../logger/logger');


router.post('/', async (req, res) => {
    const newCart = new Cart(req.body);

    await newCart.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: `There was a server side error ${err}`,
            });

        } else {
            logger.info("Cart was inserted succesfully!");
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
                logger.error(err.message);
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                ///logger.info(data);
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
                logger.error(err.message);
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                logger.info(data);
                res.status(200).json(
                    data
                );
            }
        });
});


module.exports = router;