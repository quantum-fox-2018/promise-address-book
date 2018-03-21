const Method = require('../setup.js');
const db = Method.db;

class group_contact{
    static joinGroup(nameId, groupNameId){
        return new Promise(function(resolve, reject){
            db.run(`INSERT INTO group_contacts VALUES(NULL, ?, ?)`, nameId, groupNameId, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`${nameId} has join ${groupNameId}`);
                }
            })
        })
    }

    //If group is deleted
    static deleteConjuncGroup(groupId){
        return new Promise(function(resolve, reject){
            db.run(`DELETE FROM group_contacts WHERE groupId = ?`, groupId, function(err){
                if(err){
                    reject(err);
                }
            })
        })
    }

    //If contact is deleted
    static deleteConjuncContact(contactId){
        return new Promise(function(resolve, reject){
            db.run(`DELETE FROM group_contacts WHERE contactId = ?`, contactId, function(err){
                if(err){
                    reject(err);
                }
            })
        })
    }

    static getLength(){
        return new Promise(function(resolve, reject){
            db.all(`SELECT * FROM group_contacts`, function(err, dataConjunc){
                if(err){
                    reject(err);
                }else{
                    resolve(dataConjunc.length);
                }
            })
        })
    }

    static dropGroupContact(){
        return new Promise(function(resolve, reject){
            db.run(`DROP TABLE group_contacts`, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`table group_contact has been dropped`);
                }
            });

        })
    }
}

module.exports = group_contact;