const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);

const { logger } = require('../logger/logger');


router.get("/:email", async (req, res) => {
    try {
        const data = await User.find({ email: req.params.email });
        let isAdmin = false;
        console.log(data);
        if (data[0]?.role === 'admin') {
            isAdmin = true;
        }
        logger.info(data);
        res.json({ admin: isAdmin });

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({
            error: `There was a server side error! ${err}`,
        });
    }
});
/// user api post

router.post('/', async (req, res) => {
    const newUser = new User(req.body);

    await newUser.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: "There was a server side error",
            });

        } else {
            logger.info("User was inserted succesfully!");
            res.status(200).json({
                message: "User was inserted succesfully!",
            });
        }
    });

});
// PUT user api
router.put("/", async (req, res) => {

    try {
        const user = req.body;
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateDoc = { $set: user };
        const result = await User.updateOne(filter, updateDoc, options);

        logger.info(result);
        res.status(200).json(
            result
        );
    }
    catch (err) {
        logger.error(err.message);
        res.status(500).json({
            error: `There was a server side error! ${err}`,
        });
    }


});
// user admin cheecked api
router.put('/admin', async (req, res) => {
    try {
        const user = req.body;

        const filter = { email: user.email };

        const updateDoc = { $set: { role: 'admin' } };
        const result = await User.updateOne(filter, updateDoc);
        logger.info(result);
        res.json(result);
    }
    catch (err) {
        logger.error(err.message);
        res.status(500).json({
            error: `There was a server side error! ${err}`,
        });
    }


});



module.exports = router;