const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASS || 'your-secret-password',
    database: process.env.DATABASE_DB || 'donath-ai-project'
});

module.exports = db;