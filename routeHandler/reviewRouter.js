const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const reviewSchema = require('../schemas/reviewSchema');
const Review = new mongoose.model("Review", reviewSchema);

const { logger } = require('../logger/logger');

router.get("/", async (req, res) => {
    await Review.find({})
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
                res.status(200).json(
                    data
                );
            }
        });
});
router.post('/', async (req, res) => {
    const newReview = new Review(req.body);

    await newReview.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: "There was a server side error",
            });

        } else {
            logger.info("Review was inserted succesfully!")
            res.status(200).json({
                message: "Review was inserted succesfully!",
            });
        }
    });

});

// POST MULTIPLE Review
router.post("/all", async (req, res) => {
    await Review.insertMany(req.body, (err) => {
        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: err.message,
            });
        } else {
            res.status(200).json({
                message: "Review were inserted successfully!",
            });
        }
    });
});

module.exports = router;