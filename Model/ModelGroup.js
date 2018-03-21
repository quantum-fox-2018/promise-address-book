const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class ModelGroup {
  constructor(objGroup = {}) {
    this.id = null;
    this.name = objGroup.name;
    this.contactList = [];
  }

  static listGroup(callback) {
    db.all(`SELECT * FROM groups`, (err, datas) => {
      if(err) console.log(err);
      callback(datas);
    });
  }

  addContact(contact) {
    let query = `INSERT INTO contact_groups (contact_id, group_id) VALUES (${contact.id}, ${this.id})`;
    db.run(query);
    this.contactList.push(contact);
  }

  deleteContact(contact) {
    let query = `DELETE FROM contact_groups WHERE group_id = ${this.id} AND contact_id = ${contact.id}`;
    db.run(query);
  }

  // let group = Group.find(2)
  // group.addContact(contact)

  save() {
    let thisModel = this;
    db.run(`INSERT INTO groups VALUES (NULL, '${this.name}')`, function() {
      thisModel.id = this.lastID;
    });
  }

  updateData(objUpdate, callback) {
    let key = Object.keys(objUpdate);
    for(let i in key) {
      this[key[i]] = objUpdate[key[i]];
    }
    db.run(`UPDATE groups SET name = '${this.name}' WHERE id = ${this.id}`);
    callback(this.name);
  }

  findById(id) {
    let thisModel = this;
    return new Promise(function(resolve, reject) {
      db.each(`SELECT * FROM groups WHERE id = ${id}`, (err, data) => {
        console.log('----', err,data)
        if(err) reject(err);
        thisModel.id = data.id;
        thisModel.name = data.name;
        db.all(`SELECT c.name, c.phone_number FROM contact_groups cg JOIN contacts c ON cg.contact_id = c.id JOIN groups g ON cg.group_id = g.id WHERE g.id = ${id}`, (err, data) => {
          thisModel.contactList.push(data);
          resolve();
        });
      });
    });
  }

  deleteGroup(callback) {
    let thisModel = this;
    db.run(`DELETE FROM groups WHERE id = ${thisModel.id}`);
    db.run(`DELETE FROM contact_groups WHERE group_id = ${thisModel.id}`);
    callback(thisModel.name);
  }
}

module.exports = ModelGroup;


// Group.listGroup = [{
//   id: ,
//   name:
//   contacts: []
// }]
//
// group.display()
