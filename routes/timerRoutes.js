const express = require("express");
const router = express.Router();
const { timerPresets, quotes } = require("../data/timerData");

router.get("/timers", (req, res) => {
  res.json({ success: true, count: timerPresets.length, data: timerPresets });
});

router.get("/timers/:id", (req, res) => {
  const timer = timerPresets.find(item => item.id === Number(req.params.id));
  if (!timer) {
    return res.status(404).json({ success: false, message: "Timer not found" });
  }
  res.json({ success: true, data: timer });
});

router.get("/quote", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ success: true, quote: quotes[randomIndex] });
});

module.exports = router;
