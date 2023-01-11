const path = require('path');
const express = require( 'express' );

const app = express();
const PORT = process.env.PORT || 3000;

app.use( express.static( __dirname + '/dist' ) );

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen( PORT, ( err ) => {
  if ( err ) {
      return console.log( 'something bad happened', err )
  }

  console.log( `server is listening on ${PORT}` )
}); 
