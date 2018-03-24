const argv = process.argv;
var command = argv[2].split(":");
const Contact = require('./controller/contact.js').Controller;


if(command[0] == "contacts"){

  switch (command[1]) {
    case "show": Contact.show();break;
    case "add": Contact.add(argv[3], argv[4], argv[5], argv[6]);break;//name, company, phone, email
    case "update": Contact.update(argv[3],argv[4],argv[5]);break;//id, column, value
    case "delete": Contact.delete(argv[3])// id
      break;
    default:

  }
}
