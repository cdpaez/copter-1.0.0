// config/database.js
require('dotenv').config(); // Carga variables de entorno

const { Sequelize } = require('sequelize');

// Configuración para Sequelize CLI (obligatoria)
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // ¡Explícito!
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // ¡Explícito!
    logging: false
  }
};

// Conexión para tu backend (como ya la tienes)
let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres', // ¡Explícito!
      logging: false
    }
  );
}

// Al final del archivo, reemplaza la exportación actual con:
module.exports = {
  // Configuración para CLI (requerida por migraciones)
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // ¡Debe ser explícito!
    logging: false
  },
  // Exporta la instancia que ya usa tu backend (sin cambios en tu lógica)
  sequelizeInstance: sequelize  
};
