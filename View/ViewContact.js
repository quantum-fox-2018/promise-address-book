var Table = require('cli-table');

var table = new Table({
    head: ['ID', 'Name', 'Phone Number'],
    colWidths: [5, 22, 20]
});

class ViewContact {
  static listContact(datas) {
    for(let i in datas) {
      table.push([datas[i].id, datas[i].name, datas[i].phone_number]);
    }
    console.log(table.toString());
  }

  static addContact(name) {
    console.log(`Data ${name} berhasil ditambahkan`);
  }

  static deleteContact(name) {
    console.log(`Data ${name} berhasil di hapus`);
  }

  static updateContact(name) {
    console.log(`Data ${name} berhasil di update`);
  }
}

module.exports = ViewContact;
