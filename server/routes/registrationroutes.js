const express = require("express");
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");

const router = express.Router();


// Create Registration
router.post("/", auth, async (req, res) => {
    try {

        const registration = new Registration(req.body);

        await registration.save();

        res.status(201).json(registration);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


// Get All Registrations
router.get("/", async (req, res) => {
    try {

        const registrations = await Registration.find()
            .populate("student")
            .populate("course");

        res.json(registrations);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


// Get Single Registration
router.get("/:id", async (req, res) => {

    try {

        const registration = await Registration.findById(req.params.id)
            .populate("student")
            .populate("course");


        if (!registration) {

            return res.status(404).json({
                message: "Registration Not Found"
            });

        }


        res.json(registration);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// Update Registration
router.put("/:id", auth, async (req, res) => {

    try {

        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!registration) {

            return res.status(404).json({
                message: "Registration Not Found"
            });

        }


        res.json(registration);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// Delete Registration
router.delete("/:id", auth, async (req, res) => {

    try {

        const registration = await Registration.findByIdAndDelete(
            req.params.id
        );


        if (!registration) {

            return res.status(404).json({
                message: "Registration Not Found"
            });

        }


        res.json({
            message: "Registration Deleted Successfully"
        });


    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


module.exports = router;