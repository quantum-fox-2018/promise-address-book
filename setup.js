const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('data.db');

class Database{
    static createDB(){
        db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), phone VARCHAR(30))`);
        db.run(`CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER)`);
        db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(50))`);
    }
}

module.exports = {
    Database: Database,
    db: db
};