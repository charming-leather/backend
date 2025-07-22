require('dotenv').config()
const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    connectionLimit: 5,
    acquireTimeout: 20000,
    connectTimeout: 10000,
});

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      const conn = await pool.getConnection();
      console.log(`✅ Successfully connected to ${process.env.DB_NAME}`);
      await conn.release();
    } catch (error) {
      console.error('❌ DB connection failed:', error);
    }
  })();
}


async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection()
        return await conn.query(sql, params)
    } catch (err) {
        throw err
    } finally {
        if (conn) await conn.release()
    }
}

async function callProcedure(procName, params = []) {
    const placeholders = params.length > 0 ? params.map(() => '?').join(', ') : ''
    const sql = `CALL ${procName}(${placeholders})`
    return query(sql, params)
}

module.exports = {
    query,
    callProcedure
}
