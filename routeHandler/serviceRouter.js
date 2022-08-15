const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const serviceSchema = require('../schemas/serviceSchema');
const Service = new mongoose.model("Service", serviceSchema);

const logger = require('../logger/logger');

router.get("/", async (req, res) => {
    await Service.find({})
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
router.post('/', async (req, res) => {
    const newService = new Service(req.body);

    await newService.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: "There was a server side error",
            });

        } else {
            logger.info("success");
            res.status(200).json({
                message: "Service was inserted succesfully!",
            });
        }
    });

});
// router.get("/:id", async (req, res) => {
//     await Service.find({ _id: req.params.id })
//         .select({
//             __v: 0
//         })
//         .exec((err, data) => {
//             if (err) {
//                 res.status(500).json({
//                     error: "There was a server side error!",
//                 });
//             } else {
//                 res.status(200).json(
//                     data
//                 );
//             }
//         });
// });

router.get("/:id", async (req, res) => {
    try {
        const data = await Service.find({ _id: req.params.id });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            error: `There was a server side error! ${err}`,
        });
    }
});


router.delete("/:id", async (req, res) => {
    await Service.deleteOne({ _id: req.params.id })
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


// POST MULTIPLE Service
router.post("/all", async (req, res) => {
    await Service.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: err.message,
            });
        } else {
            res.status(200).json({
                message: "Service were inserted successfully!",
            });
        }
    });
});

module.exports = router;