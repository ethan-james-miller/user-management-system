const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
db.serialize(() => {
  db.run(
    'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT)'
  );
  db.run(
    "INSERT INTO users (username, email) VALUES ('admin', 'admin@example.com')"
  );
  db.run(
    "INSERT INTO users (username, email) VALUES ('user1', 'user1@example.com')"
  );
});

app.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, users) => {
    res.render('index', { users: users });
  });
});

app.post('/add-user', (req, res) => {
  const { username, email } = req.query;
  db.run(
    'INSERT INTO users (username, email) VALUES (?, ?)',
    [username, email],
    (err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    }
  );
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.render('user', { user: user, query: req.query });
  });
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
