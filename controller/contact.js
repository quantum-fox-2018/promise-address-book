const Model = require('../model/contact.js').Model
const View = require('../view/contact.js').View

class Controller {

  static show(){
    Model.show().then(function(contacts){
      View.show(contacts)
    })
    .catch(err=>{
      View.error(err)
    })
  }

  static add(name, company, phone, email){

    let contact = new Model(name, company, phone, email);
    contact.emailValidation(contact.email).then(validate=>{
      if(validate){
        contact.add().then((addMsg)=>{
          View.add(addMsg)
        }).catch(err=>{
          View.error(err)
        })
      }else{
        let emailMsg = `Email sudah terdaftar`
        View.error(emailMsg)
      }
    })
    .catch(err=>{
      View.error(err)
    })

  }

  static update(id, column, value){

    Model.findById(id).then(contact_data=>{

      contact_data[column] = value;
      let contactName = contact_data.name;
      let contactCompany = contact_data.company;
      let contactPhone = contact_data.phone;
      let contactEmail = contact_data.email;
      let checkEmail = true

      let contact = new Model(contactName, contactCompany, contactPhone, contactEmail);
      if(column == "email"){
        contact.emailValidation(contact.email).then(validate=>{
          checkEmail = validate;
          if(checkEmail){
            contact.update(id).then((message)=>{
              View.update(message)
            })
          }else{
            let emailMsg = "Email sudah ada"
            View.error(emailMsg)
          }
        }).catch(err=>{
          View.error(err)
        })
      }
      else{
        contact.update(id).then((message)=>{
          View.update(message)
        })
        .catch(err=>{
          View.error(err)
        })
      }


    })
    .catch(err=>{
      View.error(err)
    })
  }

  static delete(id){

    let contact = new Model();
    contact.delete(id).then((message)=>{
      View.delete(message)
    })
    .catch((err)=>{
      View.error(err)
    })
  }

}

module.exports = {Controller};
