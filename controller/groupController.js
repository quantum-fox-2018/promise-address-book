const Group = require('../model/group.js');
const Contact = require('../model/contact.js');
//const View = require('../view.js');

class GroupController{
  static Command(param_command, cbResult){
    let command = param_command[3];

    if(param_command[4] != undefined && param_command[4] != ''){
      let groupObj = JSON.parse(param_command[4]);
      var group = new Group(groupObj); // pake var biar bisa di akses di bawah
      // console.log(contact);
      if(param_command[5] != undefined && param_command[5] != ''){
        let contactObj = JSON.parse(param_command[5]);
        var contact = new Contact(contactObj);
      }

    }

    switch (command) {
      case 'show':
      case 'Show':
      case undefined:
        Group.show()
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      case 'add':
        group.save()
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })

        break;

      case 'addContact':
        group.addContact(contact)
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      case 'deleteContact':
      case 'delContact':
        group.deleteContact(contact)
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      case 'showContact':
      console.log(group);
        group.showContact()
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      case 'update':
        group.update()
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      case 'delete':
        group.delete()
        .then((results) => {
          cbResult(results);
        })
        .catch((err) =>{
          cbResult(err)
        })
        break;

      default:
        cbResult(`${command} is not in the Program`)
    }
  }
}

module.exports = GroupController;

//'{"name":"Bekasi"}'
