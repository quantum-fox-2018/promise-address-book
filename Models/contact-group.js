let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class ContactGroup {
  constructor(object){
    this.id = null
    this.id_contact = object.idContact
    this.id_group = object.idGroup
  }

  addMemberPromise(){
    let cg = this
    return new Promise(function(res, rej){
      let query = `INSERT INTO contact_groups VALUES(null, ?, ?)`
      db.run(query, cg.id_contact, cg.id_group, function(err) {
        if(err) {
          rej(err)
        }else{
          res(`Add Contact Group Success, track ID : ${this.lastID}`)
        }
      })
    })
  }

  static readMemberPromise(id){
    return new Promise(function(res, rej){
      let query =`SELECT id_contact, contacts.name, contacts.phone_number FROM contact_groups JOIN contacts on contact_groups.id_contact = contacts.id where id_group = ?;`
      db.all(query, id, function(err, rows){
        if (err) {
          rej(err)
        }else{
          res(rows)
        }
      })
    })
  }

  static deleteMemberPromise(idGroup, idContact){
    return new Promise(function(res, rej){
      let query = "DELETE FROM contact_groups WHERE id_group = ? AND id_contact = ?"
      db.run(query, idGroup, idContact , function(err){
        if (err) {
          rej(err)
        }else{
          res(`delete member ${idContact} from group ${idGroup} success`)
        }
      })
    })
  }

}
module.exports = ContactGroup
