const express = require('express');
const app = express();

const inMemoryCache = {};

app.use(express.json());

app.post('/favorite', (req, res) => {
  try {
    const user = req.header('Authorization');
    if (!user) {
      console.log('Not Authorization provided');
      return res.sendStatus(401);
    }

    if (!req.body.url) {
      return res.status(400).send('Body should contain an "url"');
    }

    const isDeletion = req.body.delete;

    let cacheEntry = inMemoryCache[req.body.url] || [];
    const isAlreadyStored = cacheEntry.includes(user);

    if (isAlreadyStored && !isDeletion) {
      return res.sendStatus(200);
    }

    if (isDeletion) {
      cacheEntry = cacheEntry.filter((it) => it !== user);
    } else {
      cacheEntry.push(user);
    }

    inMemoryCache[req.body.url] = cacheEntry;

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.get('/favorite', (req, res) => {
  if (req.query.url) {
    return res.json(inMemoryCache[req.query.url] || []);
  }

  return res.json(inMemoryCache);
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(5000, () => {
  console.log(`Listening at http://localhost:5000`);
});
