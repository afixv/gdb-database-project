const Pool = require('pg').Pool
const pool = new Pool({
  user: 'afixv',
  host: '20.231.109.130',
  database: 'bookstoredb',
  password: '190702',
  port: 5432,
});

module.exports = pool;