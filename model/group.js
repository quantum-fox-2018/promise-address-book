const Setup = require('../setup.js');
const Contact = require('./contact.js');
let db = Setup.db();

class Group {
  constructor(groupObj) {
    this.id = groupObj.id || null;
    this.name = groupObj.name;
  }

  //add Contact To Group
  addContact(Contacts){
    return new Promise((resolve, reject) =>{
      //cek ada ga contactId nya
      if(Contacts !== undefined){
          //cek apakah Contact Id sudah masuk d dalam Current Group juga belum
          //cek apakah group Id ada
          this._showById()
          .then((GroupResult) =>{
            if(GroupResult[0].name != undefined){
              Contact.searchId(Contacts._id)
              .then((ContactResult) => {
                if(ContactResult[0].name != undefined){
                    let queryAddContact = `INSERT INTO GroupContacts VALUES
                                           (null, ${Contacts._id}, ${this.id})`;
                    db.run(queryAddContact, (err) => {
                      if(err){
                        reject(err);
                      }else{
                        resolve(`${ContactResult[0].name} successfully Added to Group ${GroupResult[0].name}`);
                      }
                    })
                }else{
                  resolve(`Contacts Id ${Contacts._id} is not in Contact`);
                }
              })
            }else{
              resolve(`Groups Id ${this.id} is not in Groups Data`);
            }
          })

      }else{
          resolve(`Contact id tidak ada / harus di isi`)
      }
    })

  }

  //Delete Contact From Group
  deleteContact(Contacts){
    return new Promise((resolve, reject) =>{
      //cek ada ga contactId nya
      if(Contacts !== undefined){
          //cek apakah Contact Id sudah masuk d dalam Current Group juga belum
          //cek apakah group Id ada
          this._showById()
          .then((GroupResult) =>{
            if(GroupResult[0].name != undefined){
              Contact.searchId(Contacts._id)
              .then((ContactResult) => {
                if(ContactResult[0].name != undefined){
                    let queryDelContact = `DELETE FROM GroupContacts
                                           WHERE contact_id = ${Contacts._id}
                                           AND group_id = ${this.id}`;

                    db.run(queryDelContact, (err) => {
                      if(err){
                        reject(err);
                      }else{
                        resolve(`${ContactResult[0].name} successfully Remove from Group ${GroupResult[0].name}`);
                      }
                    })
                }else{
                  resolve(`Contacts Id ${Contacts._id} is not in Contact`);
                }
              })
            }else{
              resolve(`Groups Id ${this.id} is not in Groups Data`);
            }
          })

      }else{
          resolve(`Contact id tidak ada / harus di isi`)
      }
    })

  }

  //Show Group Contact
  showContact(){
    return new Promise((resolve, reject) =>{
      this._showById()
      .then((GroupResults) => {
        if(GroupResults[0].name != undefined){
          let queryShowContact = `SELECT Groups.*, Contacts.* FROM Groups JOIN GroupContacts
                                  ON GroupContacts.group_id = Groups.id
                                  JOIN Contacts
                                  ON Contacts.id = GroupContacts.contact_id
                                  WHERE Groups.id = ${this.id}`
          db.all(queryShowContact, (err, contactResults) => {
            if(err){
              reject(err);
            }else{
              let results = `Group ${GroupResults[0].name} \n`+JSON.stringify(contactResults, null, 2)
              resolve(results);
            }
          })
        }else{
          resolve(`Groups Id ${this.id} is not in Groups Data`)
        }
      })
    })

  }

  //INSERT Data
  save() {
    return new Promise((resolve, reject) =>{
      let queryAddGroup = `INSERT INTO Groups VALUES
                             (null, "${this.name}");`
      db.run(queryAddGroup, (err) => {
        if(err){
          reject(err);
        }else{
          resolve(`${this.name} Has been Created`);
        }
        db.close();
      })
    })

  }

  //READ Data
  static show(){
    return new Promise((resolve, reject) =>{
      let queryGroupShow = `SELECT * FROM Groups`

      db.all(queryGroupShow, (err, contactData) =>{
        if(err){
          reject(err);
        }else{
          resolve(contactData);
        }
      })
    })

  }

  _showById(){
    return new Promise((resolve, reject) =>{
      let queryFindId = `SELECT * FROM Groups WHERE id = ${this.id}`
      db.all(queryFindId, (err, ContactData) =>{
        if(err){
            reject(err);
        }else{
            if(ContactData.length === 0){
                resolve(`Id is not in Table Groups`)
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
      this._showById()
      .then((ContactResult) =>{

        let ContactName = ContactResult[0].name;

        if(this.name !== undefined && this.name !== ""){
          ContactName = this.name;
        }

        let queryUpdateGroup = `UPDATE Groups
                                SET name = "${ContactName}"
                                WHERE id = ${this.id}`

        db.run(queryUpdateGroup, (err) => {
          if(err){
              reject(err);
          }else{
              resolve(`Group Id ${this.id} successfully Updated`);
          }
        })

      })
    })

  }

  delete(){
    //nanti grous di dalam contact Group juga ilang
    return new Promise((resolve, reject) =>{
      this._showById()
      .then((ContactResult) => {

        if(ContactResult[0].id != undefined){
          let GroupName = ContactResult[0].name;
          let queryDelContact = `DELETE FROM Groups WHERE id = ${this.id}`

          db.run(queryDelContact, (err) => {
              if(err){
                reject(err);
              }else{
                let queryDelGroupInContactGroup = `DELETE FROM GroupContacts WHERE group_id = ${this.id}`

                db.run(queryDelGroupInContactGroup, (err) => {
                  if(err){
                    reject(err);
                  }else{
                    resolve(`${GroupName} has been deleted From Groups..`)
                  }
                });
              }
          });
        }else{
          resolve(`Id ${this.id} is not in Table Groups`)
        }

      })
    })

  }
}

module.exports = Group;
