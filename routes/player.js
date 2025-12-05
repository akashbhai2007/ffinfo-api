const express = require("express");
const router = express.Router();
const { fetchFFPlayer } = require("../utils/fetchFF");

router.get("/", async (req, res) => {
    const uid = req.query.uid;
    if (!uid) return res.status(400).json({ error: "UID required" });

    try {
        const data = await fetchFFPlayer(uid);
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch player" });
    }
});

module.exports = router;
