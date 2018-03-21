const ModelContact = require('../Model/ModelContact.js');
const ViewContact = require('../View/ViewContact.js');

class ControllerContact {
  static listContact() {
    ModelContact.listContact()
    .then(function(datas) {
      ViewContact.listContact(datas);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  static addContact(attributesContact) {
    let contact = new ModelContact(attributesContact);
    contact.save();
    ViewContact.display(contact);
  }

  static updateContact(id, objUpdate) {
    let contact = new ModelContact();
    contact.findById(id)
    .then(function() {
      console.log("masuk");
      contact.updateData(objUpdate, ViewContact.updateContact);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  static deleteContact(id) {
    let newContact = new ModelContact();
    newContact.findById(id, function() {

    });
    newContact.findById(id)
    .then(function() {
      newContact.deleteContact(ViewContact.deleteContact);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}

module.exports = ControllerContact;
