require('dotenv').config();
const { Sequelize, Op } = require('sequelize');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL
} = process.env;

const Towns = require('./models/Town');
const Activities = require('./models/Activity');

//----------------------------------------HEROKU CONECTION------------------------------
let sequelize;
if (false
  //process.env.DATABASE_URL
  ) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
  );
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}
else {
  //-------------------------------------LOCAL----------------------------------------------------
  
  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });
}

//MODELS

Towns(sequelize);
Activities(sequelize);

const { Activity, Town } = sequelize.models;


Activity.belongsToMany(Town, { through: 'Activities_towns' });
Town.belongsToMany(Activity, { through: 'Activities_towns' });







module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
