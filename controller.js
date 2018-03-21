let Contact = require('./Models/contact')
let Group = require('./Models/group')
let View = require('./view')
let ContactGroup = require('./Models/contact-group')

class Controller{
  static acceptCommand(action){
    if (action[2] === "contact") {
      if (action[3] === "add") {
        let object = {name: action[4], phoneNumber: action[5]}
        let contact = new Contact(object);
        contact.addContactPromise()
        .then(function(str){
          View.display(str)
        })
        .catch(function(str){
          View.display(str)
        })
      }else if(action[3] === "update"){
        //id column value
        Contact.updatePromise(action[4], action[5], action[6])
        .then(function(res){
          View.display(res)
        })
        .catch(function(rej){
          View.display(rej)
        })
      }else if(action[3] === "delete"){
        Contact.deletePromise(action[4])
        .then(function(res){
          View.display(res)
        })
        .catch(function(rej){
          View.display(rej)
        })
      }else if(action[3] === "read"){
        Contact.readPromise()
        .then(function(res){
          View.display(res)
        })
        .catch(function(rej){
          View.display(rej)
        })
      }else{
        Controller.help()
      }
    }else if(action[2] === "group"){
      if (action[3] === "add") {
        let group = new Group(action[4]);
        group.addGroupPromise()
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else if(action[3] === "update"){
        Group.updatePromise(action[4], action[5])
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else if(action[3] === "delete"){
        Group.deletePromise(action[4])
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else if(action[3] === "read"){
        Group.readPromise()
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }
    }else if(action[2] === "contactgroup"){
      if (action[3] === "addmember") {
        let object = {idContact: action[5], idGroup: action[4]}
        let contactGroup = new ContactGroup(object)
        contactGroup.addMemberPromise()
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else if (action[3] === "readmember") {
        ContactGroup.readMemberPromise(action[4])
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else if (action[3] === "deletemember") {
        ContactGroup.deleteMemberPromise(action[4], action[5])
        .then(function(res){
          View.display(res);
        })
        .catch(function(rej){
          View.display(rej);
        })
      }else{
        Controller.help()
      }
    }else{
      Controller.help()
    }
  }

  static help(){
    View.display("help")
  }
}

module.exports = Controller
