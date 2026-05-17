# TerpMusic Discover

## Description

TerpMusic Discover is a web application for University of Maryland students. It allows students to submit songs, view saved songs, search for music, and see music trends by genre.

## Target Browsers

This project is designed for:

- Google Chrome
- Microsoft Edge
- Safari
- Firefox
- iOS Safari
- Android Chrome

## Developer Manual

The developer manual is below.

---

# Developer Manual

## How to Install


ow to Run

Start the server:

npm start

Then open:

http://localhost:3000
Supabase Setup

Create a Supabase table called:

songs

The table should have these columns:

id
title
artist
genre
created_at

Create a .env file with:

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Tests


My project also uses manual testing by checking each page, each button, and each API route.

API Endpoints
GET /api/songs

Gets all songs from the Supabase database.

POST /api/songs

Adds a new song to the Supabase database.

Example body:

{
  "title": "Passionfruit",
  "artist": "Drake",
  "genre": "Hip-Hop"
}
GET /api/search?q=

Searches for music using the iTunes Search API.

Example:

/api/search?q=drake
Known Bugs
The chart can reload when songs are added.
The design is simple and could be improved.
Search results depend on the external iTunes API.
Future Development

Future updates could include:

User accounts
Better mobile design
Weekly top songs
Student profiles
