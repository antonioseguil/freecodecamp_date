// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', function (req, res) {
  //obteniendo la fecha
  let fechaParam = req.params.date;
  //validando que sea unix
  if (!isNaN(fechaParam)) {
    fechaParam = parseInt(fechaParam);
  }
  //tipos de fechas
  const fecha = new Date(fechaParam);

  if (!fecha.getTime()) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: fecha.getTime(),
      utc: fecha.toUTCString()
    });
  }
});


// api que devuelve la hora actual
app.get("/api/", function (req, res) {
  const fecha = new Date();
  res.json({
    unix: fecha.getTime(),
    utc: fecha.toUTCString()
  });
});


app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
})
// listen for requests :)
/* var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
 */