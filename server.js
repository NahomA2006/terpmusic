const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Gets songs from Supabase
app.get("/api/songs", async function (req, res) {
  const result = await supabase.from("songs").select("*");

  if (result.error) {
    res.json({ error: result.error.message });
  } else {
    res.json(result.data);
  }
});

// Adds a song to Supabase
app.post("/api/songs", async function (req, res) {
  const title = req.body.title;
  const artist = req.body.artist;
  const genre = req.body.genre;

  const result = await supabase.from("songs").insert([
    {
      title: title,
      artist: artist,
      genre: genre
    }
  ]);

  if (result.error) {
    res.json({ error: result.error.message });
  } else {
    res.json({ message: "Song added" });
  }
});

// Gets data from external API
app.get("/api/search", async function (req, res) {
  const search = req.query.q;

  const url = "https://itunes.apple.com/search?term=" + search + "&entity=song&limit=5";

  const response = await fetch(url);
  const data = await response.json();

  res.json(data.results);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
