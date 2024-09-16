const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

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
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.render('index', { users: users });
  });
});

app.post('/add-user', (req, res) => {
  const { username, email } = req.body;
  db.run(
    'INSERT INTO users (username, email) VALUES (?, ?)',
    [username, email],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
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
    res.render('user', { user: user, message: req.query.message });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server running on <http://localhost:8080>');
});
