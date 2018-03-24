const Setup = require('../setup.js');
let db = Setup.db();

class Contact {
  constructor(contactObj){
    this._id = contactObj.id || null;
    this._name = contactObj.name;
    this._phone_number = contactObj.phone_number;
    this._email = contactObj.email;
  }

  // set id(value){
  //   this._id = value;
  // }
  //
  // get id(){
  //   return console.log(this._id);
  // }

  //INSERT Data
  save() {
    return new Promise((resolve, reject) =>{
      let queryAddContact = `INSERT INTO Contacts VALUES
                             (null, "${this._name}",
                             "${this._phone_number}",
                             "${this._email}");`
      db.run(queryAddContact, (err) => {
        if(err){
          reject(err);
          // console.log(err);
        }else{

          resolve(`${this._name} Has been added to Contacts`);
          db.close();
          // console.log(`${this._name} Has been added to Contacts`);
        }
      })
    })

  }

  //READ Data
  static show(){
    return new Promise((resolve, reject) =>{
      let queryContactShow = `SELECT * FROM Contacts`

      db.all(queryContactShow, (err, contactData) =>{
        if(err){
          reject(err);
        }else{
          resolve(contactData);
        }
      })
    })

  }

  showById(){
    return new Promise((resolve, reject) =>{
        let queryFindId = `SELECT * FROM Contacts WHERE id = ${this._id}`
        db.all(queryFindId, (err, ContactData) =>{
          if(err){
              reject(err);
          }else{
              if(ContactData.length === 0){
                  resolve(`Id ${this._id} is not in Table Contacts`)
              }else{
                  resolve(ContactData);
              }
          }
        })
    })

  }

  static searchId(contactId){
    return new Promise((resolve, reject) =>{
      let queryFindId = `SELECT * FROM Contacts WHERE id = ${contactId}`
      db.all(queryFindId, (err, ContactData) =>{
        if(err){
            reject(err);
        }else{
            if(ContactData.length === 0){
                resolve(`Id ${contactId} is not in Table Contacts`)
            }else{
                resolve(ContactData);
            }
        }
      })
    })

  }

  //UPDATE DATA
  update(){
    return new Promise((resolve, reject) =>{
        this.showById()
        .then((ContactResult) =>{

          let ContactName = ContactResult[0].name;
          let phone_number = ContactResult[0].phone_number;
          let email = ContactResult[0].email;

          if(this._name !== undefined && this._name !== ""){
            ContactName = this._name;
          }
          if(this._phone_number !== undefined && this._phone_number !== ""){
            phone_number = this._phone_number;
          }
          if(this._email !== undefined && this._email !== ""){
            email = this._email;
          }

          let queryUpdateContacts = `UPDATE Contacts
                                     SET name = "${ContactName}",
                                     phone_number = "${phone_number}",
                                     email = "${email}"
                                     WHERE id = ${this._id}`

          db.run(queryUpdateContacts, (err) => {
            if(err){
                reject(err);
            }else{
                resolve(`Contacts Id ${this._id} successfully Updated`);
            }
          })

        });
    })
  }

  delete(){
    return new Promise((resolve, reject) =>{
      this.showById()
      .then((ContactResult) => {

        if(ContactResult[0].id != undefined){
          let queryDelContact = `DELETE FROM Contacts WHERE id = ${this._id}`
          // cbResult(queryDelContact);
          db.run(queryDelContact, (err) => {
              if(err){
                reject(err);
              }else{
                //Hapus id contact yang ada d dalem groupContacts
                let queryDelContactInGroup = `DELETE FROM GroupContacts WHERE contact_id = ${this._id}`

                db.run(queryDelContactInGroup, (err) => {
                  if(err){
                    reject(err);
                  }else{
                    resolve(`Contact id ${this._id} has been deleted From contact..`)
                  }
                })

              }
          })
        }else{
          resolve(`Id ${this._id} is not in Table Contacts`)
        }

      })
    })

  }
}

// let contact = new Contact('{"name": "Joko", "phone_number": "0823437285", "email":"joko@gmail.com"}');
// console.log(contact);
// contact.save();
// contact.id;

module.exports = Contact;
