const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the SQLite database.');
    // Create table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    )`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("TABLE CREATED"); 
      }
    });
  }
});


module.exports = db;