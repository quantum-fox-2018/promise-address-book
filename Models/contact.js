let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/address_book.db');

class Contact {
  constructor(object){
    this.id = null
    this.name = object.name
    this.phoneNumber = object.phoneNumber
  }

  static validatePhone(str){
    for (var i = 0; i < str.length; i++) {
      if ('0123456789'.indexOf(str[i])  === -1) {
        return false
      }
    }

    if (str.toString().length < 13 && str.toString().length > 5){
      return true
    }else{
      return false
    }
  }

  addContactPromise(){
    let self = this
    let promise = new Promise(function(resolve, reject){
      if (Contact.validatePhone(self.phoneNumber)) {
        let query = `INSERT INTO contacts VALUES(null, ?, ?)`
        db.run(query, [self.name, self.phoneNumber], function(err) {
          if(err){
            reject(err)
          }else{
            resolve(`Add Contact Success, Contact ID : ${this.lastID}`)
          }
        })
      }else{
        reject(`phone number is not valid`)
      }
    })//end of promise
    return promise;
  }

  static updatePromise(id, column, value){
    return new Promise(function(res, rej){
      if (column === 'phone_number') {
        if (Contact.validatePhone(value)) {
          let query = `UPDATE contacts SET ${column} = '${value}' WHERE id = ${id}`
          db.run(query, function(err){
            if (err) {
              rej(err)
            }else{
              res(`update success ${column} into ${value}`)
            }
          })
        }else{
          rej(`phone number is not valid`)
        }
      }else{
        let query = `UPDATE contacts SET ${column} = '${value}' WHERE id = ${id}`
        db.run(query, function(err){
          if (err) {
            rej(err)
          }else{
            res(`update success ${column} into ${value}`)
          }
        })
      }
    })
  }

  static deletePromise(id){
    return new Promise(function(res, rej){
      let query = `DELETE FROM contacts WHERE id = ${id}`
      let query2 = `DELETE FROM contact_groups where id_contact = ${id}`
      db.run(query2, function(err){
        if (err) {
          rej(err)
        } else {
          db.run(query, function(err2){
            if (err2) {
              rej(err2)
            }else{
              res(`success : ID : ${id} deleted`)
            }
          })
        }
      })

    })
  }

  static readPromise(){
    return new Promise(function(res, rej){
      let query = `SELECT * FROM contacts`
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

module.exports = Contact
