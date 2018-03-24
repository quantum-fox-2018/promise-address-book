var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

db.serialize(function() {

  db.run("CREATE TABLE IF NOT EXISTS Contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), company VARCHAR(30), phone VARCHAR(20), email VARCHAR(20))");
  db.run("CREATE TABLE IF NOT EXISTS Address (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), street VARCHAR(30), city VARCHAR(30))");

  db.run("INSERT INTO Contact (id,name,company,phone,email) VALUES (NULL, 'Rama', 'Hacktiv8', '76625277', 'rama@gmail.com')")
  db.run("INSERT INTO Contact (id,name,company,phone,email) VALUES (NULL, 'Budi', 'Hacktiv8', '73125277', 'budi@gmail.com')")
  db.run("INSERT INTO Contact (id,name,company,phone,email) VALUES (NULL, 'Asep', 'Hacktiv8', '73655277', 'asep@gmail.com')")

});

db.close();
