
const express = require('express');
const app = express();
const http = require('https');

app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port = 3000;


app.get('/', (req, res) => {
  res.redirect('/html');
});

app.get("/html", (request, response) => {
  const options = {
    method: 'GET',
    hostname: 'imdb-top-100-movies.p.rapidapi.com',
    port: null,
    path: '/top100movies',
    headers: {
        'X-RapidAPI-Key': 'd77feded98msh99646165ec83639p108158jsnaae1a3a7d6d7',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });


    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      let data = JSON.parse(body);

   

      response.render('index.ejs', { movie: data })


    });
  });
  req.end();
});


app.listen(port, () => {
  console.log(`Server running at port:${port}/`);
});