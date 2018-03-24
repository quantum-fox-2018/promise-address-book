const sqlite3 = require('sqlite3').verbose();

class Database {
  static db(){
    return new sqlite3.Database('address_book.db');
  }

  static setup(){
    let db = this.db();

    db.serialize( () => {
      let queryContactsTable = `CREATE TABLE IF NOT EXISTS Contacts
                                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name VARCHAR(30), phone_number VARCHAR(15),
                                email VARCHAR(25));`
      let queryGroupsTable =`CREATE TABLE IF NOT EXISTS Groups
                             (id INTEGER PRIMARY KEY AUTOINCREMENT,
                             name VARCHAR(30));`;
      let queryConjuction = `CREATE TABLE IF NOT EXISTS GroupContacts
                             (id INTEGER PRIMARY KEY AUTOINCREMENT,
                             contact_id INTEGER, group_id INTEGER,
                             FOREIGN KEY(contact_id) REFERENCES Contacts(id),
                             FOREIGN KEY(group_id) REFERENCES Groups(id))`
      db.run(queryContactsTable);
      db.run(queryGroupsTable);
      db.run(queryConjuction);

      db.close();
    })


  }
}

module.exports = Database;
