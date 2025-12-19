import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask", async (req, res) => {
  const msg = req.body.message;

  if (!msg) return res.json({ reply: "No message received." });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Eleco AI." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });
  } catch {
    res.json({ reply: "AI error" });
  }
});

app.listen(process.env.PORT || 3000);
