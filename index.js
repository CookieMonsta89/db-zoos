const express = require('express');
const helmet = require('helmet');
const db = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('up and running...');
})

server.get('/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.post('/zoos', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name" });
  }
  db.insert({name})
    .into('zoos')
    .then(zoo => res.status(201).json({ name }))
    .catch(err => res.status(400).json({ error: "Error Saving"}))
    
})








const port = 3300;
server.listen(port, function() {
 console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

