const express = require("express");
const router = express.Router();
const CarouselItem = require("./models/CarouselItem");

// GET all items
router.get("/", async (req, res) => {
    const items = await CarouselItem.find();
    res.json(items);
});

// POST new item
router.post("/", async (req, res) => {
    const newItem = new CarouselItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

// DELETE item by ID
router.delete("/:id", async (req, res) => {
    await CarouselItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
});

module.exports = router;
