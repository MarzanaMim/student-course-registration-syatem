const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Course
router.post("/", auth, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get All Courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get Single Course
router.get("/:id", async (req, res) => {
    try {

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.json(course);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Update Course
router.put("/:id", auth, async (req, res) => {
    try {

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.json(course);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Delete Course
router.delete("/:id", auth, async (req, res) => {
    try {

        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.json({
            message: "Course Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;