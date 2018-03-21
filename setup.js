const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

db.serialize(function(){
  let createTableContactQuery = `CREATE TABLE IF NOT EXISTS contacts
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                phone_number VARCHAR NOT NULL UNIQUE
              )`

  let createTableGroupQuery = `CREATE TABLE IF NOT EXISTS groups
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL
              )`

  let createTableContactGroupQuery = `CREATE TABLE IF NOT EXISTS contact_groups
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_contact INTEGER REFERENCES contacts(id),
                id_group INTEGER REFERENCES groups(id)
              )`

  db.run(createTableContactQuery)
  db.run(createTableGroupQuery)
  db.run(createTableContactGroupQuery)
})
