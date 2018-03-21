const Method = require('../setup.js');
const db = Method.db;

class Contacts{

    static getAllContacts(){
        return new Promise(function(resolve, reject){
            db.all(`SELECT * FROM Contacts`, function(err, data){
                if(!err){
                    if(data.length == 0){
                        resolve(`Data is empty`)
                    }else{
                        resolve(data);
                    }
                }else{
                    reject(err);
                }
            });
        })
    }

    static addContact(name, phone){
        return new Promise(function(resolve, reject){
            db.run(`INSERT INTO Contacts VALUES (NULL, ?, ?)`, name, phone, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`Sukses!`);
                }
            });
        })
    }

    static dropTable(){
        return new Promise(function(resolve, reject){
            db.run(`DROP TABLE IF EXISTS Contacts`, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve('Table Contacts have been dropped!');
                }
            })
        })
    }

    static deleteContact(id){
        return new Promise(function(resolve, reject){
            if(id == undefined){
                callback(`Please input a valid id`);
            }
            else{
                db.run(`DELETE FROM Contacts WHERE id = ?`, id, function(err){
                    if(err){
                        reject(err);
                    }else{
                        resolve(`Contacts with id = ${id} has been deleted`);
                    }
                });
            }
        })
    }

    static updateContact(id, name){

        return new Promise(function(resolve, reject) {
            if(id == undefined){
                resolve(`Please input a valid id`);
            }else{
                db.run(`UPDATE Contacts SET name = ? WHERE id = ?`, name, id, function(err){
                    if(err){
                        reject(err);
                    }else{
                        resolve(`Data has been updated!`);
                    }
                })
            }   
        })
    }

    static showAll(name){
        return new Promise(function(resolve, reject) {
            db.all(`SELECT * FROM group_contacts`, name, function(err, result) {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

}

module.exports = Contacts;