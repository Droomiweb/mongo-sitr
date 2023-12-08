const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connection URI
const uri = 'ypur_URI';
const dbName = 'test';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('form_data');

    const formData = {
      name: req.body.name,
      age: parseInt(req.body.age),
      city: req.body.city,
    };

    const result = await collection.insertOne(formData);
    console.log('Data inserted successfully:', result.ops);

    res.send('Form submitted successfully!');
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
