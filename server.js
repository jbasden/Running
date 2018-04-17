// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const db = require('knex')(config);

app.get('/api/runs', (req,res) => {
  db('runs').select().from('runs').then(runs => {
    res.send(runs);
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/runs', (req,res) => {
  db('runs').insert({length:req.body.length,time: req.body.time,personal_notes: req.body.personal_notes,run_on: new Date()}).then(run => {
    res.status(200).json({id:run[0]});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.delete('/api/runs/:id', (req,res) => {
  let id = parseInt(req.params.id);
  db('runs').where('id',id).del().then(runs => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3001, () => console.log('Server is listening on port 3001!!!'))
