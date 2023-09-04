const server = require('./src/app.js');
const { conn, Town, Activity, Activities_towns } = require('./src/db.js');
const axios = require('axios').default;
const PORT = process.env.PORT || 3001;




conn.sync({ force: false }).then(async () => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });

  let actividad = await Activity.findOne({ where: { id: '01ef0f09-3ee4-4f53-931b-2aaf683d9330' } });
  let muni = await Town.findOne({
    where: { name: 'Bello' },

    include: [
      {
        model: Activity,
        through: {
          attributes: [], // Esto evita que se incluyan columnas de la tabla intermedia
        },
      },
    ],
  })

  console.log(JSON.stringify(muni))


});