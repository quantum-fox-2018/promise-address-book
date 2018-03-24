const View = require('./view.js');
const Database = require('./setup');
const ContactController = require('./controller/contactController.js');
const GroupController = require('./controller/groupController.js');

//require('./model/contact.js');

class Controller {
  static cekCommands(param_command){
    let command = param_command[2];

    switch (command) {
      case undefined:
        View.show(`Isi Nama Commands`);
        break;

      case 'help':
        //tampilkan semua command

      case 'setup':
        Database.setup();
        break;

      case 'Contacts':
      case 'Contact':
        ContactController.Command(param_command, (contactResult) =>{
          View.show(contactResult);
        });
        break;

      case 'Groups':
      case 'Group':
        GroupController.Command(param_command, (groupResult) =>{
          View.show(groupResult);
        })
        break;

      default:
        View.show('Nama Command tidak ada')
    }
    // console.log(param_command);

  }
}

module.exports = Controller;
