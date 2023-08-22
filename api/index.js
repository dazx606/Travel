const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios').default;
const countryRoute = require('./src/routes');
const PORT = process.env.PORT || 3001;

server.use('/country', countryRoute);




// Syncing all the models at once.s

conn.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  //----------------------db push -----------------------------
 

});