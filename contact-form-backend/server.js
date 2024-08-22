const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the contacts database.');
});

// Create table
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT
)`);

// POST endpoint to save contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.run(`INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));