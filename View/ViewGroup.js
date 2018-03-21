var Table = require('cli-table');

var table = new Table({
    head: ['ID', 'Group Name'],
    colWidths: [5, 22]
});

var table2 = new Table({
    head: ['Contact Name', 'Phone Number'],
    colWidths: [20, 20]
});

class ViewGroup {
  static listGroup(datas) {
    for(let i in datas) {
      table.push([datas[i].id, datas[i].name]);
    }
    console.log(table.toString());
  }

  static listContactGroup(group) {
    let isFind = false;
    for(let i in group.contactList[0]) {
      table2.push([group.contactList[0][i].name, group.contactList[0][i].phone_number]);
      isFind = true;
    }
    if(isFind)
      console.log(table2.toString());
  }

  static addGroup(group) {
    console.log(`Data ${group.name} berhasil ditambahkan`);
  }

  static deleteGroup(group) {
    console.log(`Data ${group.name} berhasil di hapus`);
  }

  static updateGroup(group) {
    console.log(`Data ${group.name} berhasil di update`);
  }

  static addContact() {
    console.log(`Data contact berhasil ditambahkan`);
  }

  static removeContact() {
    console.log(`Data contact berhasil dihapus`);
  }
}

module.exports = ViewGroup;
