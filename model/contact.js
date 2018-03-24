var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

class Model {

  constructor(name, company, phone, email){
    this.name = name;
    this.company = company;
    this.phone = phone;
    this.email = email
  }

  static show(){

    return new Promise ((resolve,reject) => {

      let selectAllQuery = `SELECT * FROM Contact`;
      db.all(selectAllQuery, function(err,contacts){
        if(err){
          reject(err)
        }else{
          resolve(contacts)
        }
      })
    })
  }

  add(){

    return new Promise((resolve,reject)=>{

      let newData = [this.name, this.company, this.phone, this.email];
      let addQuery = `INSERT INTO Contact (id,name,company,phone,email) VALUES(NULL,?,?,?,?)`
      db.run(addQuery, newData, function(err){
        if(err){
          reject(err);
        }else{

          let addMsg = "Add new Person to your Contact"
          resolve(addMsg)
        }
      })

    })

  }

  static findById(contactId){
    return new Promise ((resolve,reject)=>{

      let searchQuery = `SELECT * FROM Contact WHERE id = ?`
      db.get(searchQuery, contactId, (err,contact)=>{
        if(err){
          reject(err)
        }else{
          resolve(contact)
        }
      })

    })
  }

  update(contactId){

    return new Promise ((resolve,reject)=>{

      let newData = [this.name, this.company, this.phone, this.email, contactId];
      let updateQuery = `UPDATE Contact SET (name,company,phone,email) = (?,?,?,?) WHERE id = ?`
      db.run(updateQuery, newData, function(err){
        if(err){
          reject(err);
        }else{
          let updateMsg = "Update Person to your Contact"
          resolve(updateMsg)
        }
      })
    })
  }

  delete(contactId){

    return new Promise((resolve,reject)=>{

      let deleteQuery = `DELETE FROM Contact WHERE id = ?`
      db.run(deleteQuery, contactId, function(err){
        if(err){
          reject(err)
        }else{
          let deleteMsg = "One contact has been deleted from your contacts"
          resolve(deleteMsg)
        }
      })
    })
  }

  emailValidation(checkEmail){

    return new Promise((resolve,reject)=>{

      let checkQuery = `SELECT * FROM Contact WHERE EMAIL = ?`
      db.get(checkQuery,checkEmail,(err,data)=>{
        if(err){
          reject(err)
        }else if(data == null){
          resolve(true)
        }else{
          resolve(false)
        }
      })

    })
  }
}

module.exports = {Model};
