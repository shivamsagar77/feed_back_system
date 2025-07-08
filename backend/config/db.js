// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'shivam1234',
  port: 5432, // Make sure PostgreSQL is really using this port
});

// Optional connection test
pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return pool.query('SELECT NOW()');
  })
  .then(res => {
    console.log('✅ Query result:', res.rows);

  })
  .catch(err => {
    console.error('❌ Error connecting to PostgreSQL:', err);
  });

// ✅ Export the instance
module.exports = pool;
