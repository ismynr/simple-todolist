const mysql = require('mysql2/promise');

// koneksi ke database
const db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    database: process.env.MYSQL_DBNAME || 'hello',
    password: process.env.MYSQL_PASSWORD || 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// migrasi database
const migration = async () => {
    try {
         // query mysql untuk membuat table contacts
        await db.query(
            `
            CREATE TABLE IF NOT EXISTS activities (
                activity_id INT AUTO_INCREMENT primary key NOT NULL,
                title VARCHAR(255),
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )
        `
        );
        await db.query(
            `
            CREATE TABLE IF NOT EXISTS todos (
                todo_id INT AUTO_INCREMENT primary key NOT NULL,
                activity_group_id INT NOT NULL,
                title VARCHAR(255),
                priority VARCHAR(255),
                is_active CHAR(1),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        );
        console.log('Running Migration Successfully!');
    } catch (err) {
        throw err;
    }
};

module.exports = { db, migration };
