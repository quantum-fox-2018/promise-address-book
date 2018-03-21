const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class ModelContact {
  constructor(objContact = {}) {
    this.id = null;
    this.name = objContact.name;
    this.phone_number = objContact.phone_number;
  }

  static listContact() {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM contacts`, (err, datas) => {
        if(err) {
          reject(err);
        } else {
          resolve(datas);
        }
      });
    });
  }

  save() {
    let thisModel = this;
    db.run(`INSERT INTO contacts VALUES (NULL, '${this.name}', '${this.phone_number}')`, function() {
      thisModel.id = this.lastID;
    });
  }

  updateData(objUpdate, callback) {
    let key = Object.keys(objUpdate);
    for(let i in key) {
      this[key[i]] = objUpdate[key[i]];
    }
    db.run(`UPDATE contacts SET name = '${this.name}', phone_number = '${this.phone_number}' WHERE id = ${this.id}`);
    callback(this.name);
  }

  findById(id) {
    let numId = Number(id);
    let thisModel = this;
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM contacts WHERE id = ${numId}`, (err, data) => {
        if(err) {
          reject(err);
        } else {
          console.log("seneh");
          thisModel.id = data.id;
          thisModel.name = data.name;
          thisModel.phone_number = data.phone_number;
          resolve();
        }
      });
    });
  }

  deleteContact(callback) {
    let thisModel = this;
    db.run(`DELETE FROM contacts WHERE id = ${thisModel.id}`);
    db.close();
    callback(thisModel.name);
  }
}

module.exports = ModelContact;
