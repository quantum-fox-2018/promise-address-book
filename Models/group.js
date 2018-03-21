let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class Group {
  constructor(name){
    this.id = null
    this.name = name
  }

  addGroupPromise(){
    let group = this
    return new Promise(function(res, rej){
      let query = `INSERT INTO groups VALUES(null, ?)`
      db.run(query, group.name, function(err) {
        if(err) {
          rej(err)
        }else{
          res(`Add Group Success, Group ID : ${this.lastID}`)
        }
      })
    })
  }


  static updatePromise(id, value){
    return new Promise(function(res, rej){
      let query = `UPDATE groups SET name = '${value}' WHERE id = ${id}`
      db.run(query, function(err){
        if (err) {
          rej(err)
        }else{
          res(`update success, name into ${value}`)
        }
      })
    })
  }

  static deletePromise(id){
    return new Promise(function(res, rej){
      let query = `DELETE FROM groups WHERE id = ${id}`
      let query2 = `DELETE FROM contact_groups where id_group = ${id}`
      db.run(query2,function(err){
        if (err) {
          rej(err)
        }else{
          db.run(query, function(err2){
            if (err2) {
              rej(err2)
            }else{
              res(`success, ID : ${id} deleted`)
            }
          })
        }
      })
    })
  }

  static readPromise(){
    return new Promise(function(res, rej){
      let query = `SELECT * FROM groups`
      db.all(query, function(err, rows){
        if (err) {
          rej(err)
        }else{
          res(rows)
        }
      })
    })
  }

}

module.exports = Group
