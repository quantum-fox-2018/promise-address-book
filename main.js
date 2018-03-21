const ControllerContact = require('./Controller/ControllerContact.js');
const ControllerGroup = require('./Controller/ControllerGroup.js');

let input = process.argv;
let menu = input[2];
if(menu == "listContact") {
  ControllerContact.listContact();
} else if(menu == "addContact") {
  let attributesContact = {name: input[3], phone_number: input[4]};
  ControllerContact.addContact(attributesContact);
} else if(menu == "updateContact") {
  let objUpdate = JSON.parse(input[4]);
  ControllerContact.updateContact(input[3], objUpdate);
} else if(menu == "deleteContact") {
  ControllerContact.deleteContact(input[3]);
} else if(menu == "listGroup") {
  ControllerGroup.listGroup();
} else if(menu == "addGroup") {
  let attributesContact = {name: input[3]};
  ControllerGroup.addGroup(attributesContact);
} else if(menu == "updateGroup") {
  let objUpdate = JSON.parse(input[4]);
  ControllerGroup.updateGroup(input[3], objUpdate);
} else if(menu == "deleteGroup") {
  ControllerGroup.deleteGroup(input[3]);
} else if(menu == "listContactGroup") {
  ControllerGroup.listContactGroup(input[3]);
} else if(menu == "addContactGroup") {
  ControllerGroup.addContactToGroup(input[3], input[4]);
} else if(menu == "deleteContactGroup") {
  ControllerGroup.deleteContactFromGroup(input[3], input[4]);
}
