const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);




router.get("/:email", async (req, res) => {
    try {
        const data = await User.find({ email: req.params.email });
        let isAdmin = false;
        console.log(data);
        if (data[0]?.role === 'admin') {
            isAdmin = true;
        }
        res.json({ admin: isAdmin });
        ///  res.status(200).json(data);
    } catch (err) {
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
            res.status(500).json({
                error: "There was a server side error",
            });

        } else {
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
        console.log(result)
        res.status(200).json(
            result
        );
    }
    catch (err) {
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
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            error: `There was a server side error! ${err}`,
        });
    }


});



module.exports = router;