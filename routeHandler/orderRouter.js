const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = require('../schemas/orderSchema');
const Order = new mongoose.model("Order", orderSchema);

const { logger } = require('../logger/logger');

router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);

    await newOrder.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: `There was a server side error ${err}`,
            });

        } else {
            logger.info("Order was inserted succesfully!");
            res.status(200).json({
                message: "Order was inserted succesfully!",
            });
        }
    });

});
router.get("/", async (req, res) => {
    await Order.find({})
        .select({
            __v: 0
        })
        .exec((err, data) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({
                    error: `There was a server side error ${err}`,
                });
            } else {
                logger.info(data);
                res.status(200).json(
                    data
                );
            }
        });
});

router.get("/:email", async (req, res) => {
    await Order.find({ email: req.params.email })
        .select({
            __v: 0
        })
        .exec((err, data) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({
                    error: `There was a server side error ${err}`,
                });
            } else {
                logger.info(data);
                res.status(200).json(
                    data
                );
            }
        });
});
// PUT Order
router.put("/:id", async (req, res) => {
    const result = await Order.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: "Shipped",
            },
        },
        {
            new: true,
            useFindAndModify: false,
        })
        .exec((err, data) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({
                    error: `There was a server side error ${err}`,
                });
            } else {
                logger.info(data);
                res.status(200).json(
                    data
                );
            }
        });

    console.log(result);
});
router.delete("/:id", async (req, res) => {
    await Order.deleteOne({ _id: req.params.id })
        .select({
            __v: 0
        })
        .exec((err, data) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({
                    error: `There was a server side error ${err}`,
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