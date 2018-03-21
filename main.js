var argv = process.argv;
const Controller = require('./controller.js');
const Module = require('./setup.js');
const Database = Module.Database;

Database.createDB();

var command = argv[2];
var input = argv.slice(3, argv.length);

if(command == 'contact'){
    Controller.contactManip(input);
}else if(command == 'group'){
    Controller.groupManip(input);
}else if(command == 'dropGroupContact'){
    Controller.deleteConnectionGroup();
}else{
    console.log('Wrong input command! Try contact/group/joinGroup');
}

