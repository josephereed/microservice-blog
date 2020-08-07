const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];


app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-serv:4000/events', event);
  axios.post('http://comments-serv:4001/events', event);
  axios.post('http://query-serv:4002/events', event);
  axios.post('http://moderation-serv:4003/events', event);

  res.send({ status: 'ok'});
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('event bus listening on port 4005');
});