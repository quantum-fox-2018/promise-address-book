const ModelGroup = require('../Model/ModelGroup.js');
const ModelContact = require('../Model/ModelContact.js');
const ViewGroup = require('../View/ViewGroup.js');

class ControllerGroup {
  static listGroup() {
    ModelGroup.listGroup(ViewGroup.listGroup);
  }

  static listContactGroup(id) {
    let group = new ModelGroup();
    //group.contacts
    group.findById(id)
    .then(function() {
      ViewGroup.listContactGroup(group);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  // get contacts(){
  //   this.findById(this.id, (){
  //     ViewGroup.listContactGroup(this)
  //   })
  // }

  // let group = Group.findById(1)
  // group.contacts

  static addGroup(attributesGroup) {
    let group = new ModelGroup(attributesGroup);
    group.save();
    ViewGroup.addGroup(group);
  }

  static updateGroup(id, objUpdate) {
    let group = new ModelGroup();
    group.findById(id)
    .then(function() {
      group.updateData(objUpdate, ViewGroup.updateGroup);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  static addContactToGroup(idGroup, idContact) {
    let group = new ModelGroup();
    group.findById(idGroup)
    .then(function() {
      console.log("*", group);
      let contact = new ModelContact();
      contact.findById(idContact)
      .then(function() {
        console.log("masuk");
        group.addContact(contact);
      })
      .catch(function(err) {
        console.log("-", err);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
    ViewGroup.addContact();
  }

  static deleteContactFromGroup(idGroup, idContact) {
    let group = new ModelGroup();
    group.findById(id)
    .then(function() {
      let contact = new ModelContact();
      contact.findById(idContact)
      .then(function() {
        group.deleteContact(contact);
      })
    })
    .catch(function(err) {
      console.log(err);
    });
    ViewGroup.removeContact();
  }

  static deleteGroup(id) {
    let group = new ModelGroup();
    group.findById(id)
    .then(function() {
      group.deleteGroup(ViewGroup.deleteGroup);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}

module.exports = ControllerGroup;
