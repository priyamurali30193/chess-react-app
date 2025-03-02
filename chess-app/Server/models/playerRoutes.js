const express = require("express");
const Player = require("./Player"); // Ensure you create this model!

const router = express.Router();

// ✅ Create a new player
router.post("/", async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: "Error creating player" });
  }
});

// ✅ Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Error fetching players" });
  }
});

module.exports = router;
