const express = require("express");
const OpenAI = require("openai");
const { userAuth } = require("../middlewares/auth");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/analyze-error", userAuth, async (req, res) => {
  const { error } = req.body;

  if (!error) {
    return res.status(400).json({ message: "Error text is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert developer assistant. Analyze JavaScript/React/Node errors and suggest likely causes and fixes.",
        },
        {
          role: "user",
          content: `Here's the error message:\n\n${error}`,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;
    res.json({ analysis: aiResponse });
  } catch (err) {
    console.error("AI analysis failed:", err);
    res.status(500).json({
      message: "AI analysis failed",
      details: err.message,
    });
  }
});

module.exports = router;
