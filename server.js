const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const access_key = '09ce42f77007d00a8005202f9eb969492e925a57fcb58f7ae0061874283ad225';
// const secret_key = ENV['UNSPLASH_SECRET_KEY'];

app.get(`https://api.unsplash.com/photos/random?client_id=${access_key}`, (req, res) => {
  res.send({
    id: res.id,
    imageURL: res.urls.small,
    location: {
      city: res.location.city,
      country: res.location.country,
    },
    userId: res.user.id,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
