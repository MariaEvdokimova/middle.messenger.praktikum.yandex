const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/`));

app.listen(PORT, (err) => {
  if (err) {
      return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${PORT}`)
}); 