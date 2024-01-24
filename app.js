const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

app.use(express.json());


app.post('/create', (req, res) => {
  const { key, value } = req.body;
  client.set(key, value, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating entry');
    } else {
      res.status(201).send('Entry created successfully');
    }
  });
});


app.get('/read/:key', (req, res) => {
  const key = req.params.key;
  client.get(key, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading entry');
    } else {
      res.status(200).json({ key, value: result });
    }
  });
});


app.put('/update', (req, res) => {
  const { key, value } = req.body;
  client.set(key, value, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating entry');
    } else {
      res.status(200).send('Entry updated successfully');
    }
  });
});


app.delete('/delete/:key', (req, res) => {
  const key = req.params.key;
  client.del(key, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting entry');
    } else {
      res.status(200).send('Entry deleted successfully');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
