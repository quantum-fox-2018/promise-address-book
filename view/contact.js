class View {
  constructor() {

  }

  static show(objContacts){

    for(let i=0;i<objContacts.length;i++){
      let contact = objContacts[i];
      console.log(`${contact.id}. Name : ${contact.name} Company : ${contact.company} Email : ${contact.email}`);
    }
  }

  static error(errorMsg){
    console.log(errorMsg);
  }

  static add(message){

    console.log(message);
  }

  static update(message){
    console.log(message);
  }

  static delete(message){
    console.log(message);
  }
}

module.exports = {View};
