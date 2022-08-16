const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const blogSchema = require('../schemas/blogSchema');
const Blog = new mongoose.model("Blog", blogSchema);
const ourTeamSchema = require('../schemas/ourTeamSchema');
const OurTeam = new mongoose.model("OurTeam", ourTeamSchema);


const { logger } = require('../logger/logger');
router.get('/', (req, res) => {
    return res.send('hello bro whatsup .');
});
router.get("/ourteam", async (req, res) => {
    await OurTeam.find({})
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
router.get("/blogs", async (req, res) => {
    await Blog.find({})
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
router.post('/blogs', async (req, res) => {
    const newBlog = new Blog(req.body);

    await newBlog.save((err) => {

        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: "There was a server side error",
            });

        } else {
            res.status(200).json({
                message: "Blog was inserted succesfully!",
            });
        }
    });

});

// POST MULTIPLE Blogs
router.post("/blogs/all", async (req, res) => {
    await Blog.insertMany(req.body, (err) => {
        if (err) {
            logger.error(err.message);
            res.status(500).json({
                error: err.message,
            });
        } else {
            res.status(200).json({
                message: "Blog were inserted successfully!",
            });
        }
    });
});

module.exports = router;