const Method = require('../setup.js');
const db = Method.db;

class Groups{
    static getAllGroups(){
        return new Promise(function(resolve, reject) {
            db.all(`SELECT * FROM Groups`, function(err, groupData){
                if(err){
                    reject(err);
                }else{
                    if(groupData.length == 0){
                        resolve(`There is currently no group made!`);
                    }else{
                        resolve(groupData);
                    }
                }
            })
        })
    }

    static addGroup(groupName){
        return new Promise(function(resolve, reject){
            db.run(`INSERT INTO Groups VALUES(NULL, ?)`, groupName, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`${groupName} has been created!`);
                }
            });
        })
    }

    static dropGroup(){
        return new Promise(function(resolve, reject){
            db.run(`DROP TABLE IF EXISTS Groups`, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`Table Groups has been dropped!`);
                }
            })
        })
    }

    static deleteGroup(groupName){
        return new Promise(function(resolve, reject) {
            db.run(`DELETE FROM Groups WHERE group_name = ?`, groupName, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(`Group ${groupName} has been deleted!`);
                }
            })
        })
    }

    static UpdateGroup(id, groupName){
        return new Promise(function(resolve, reject) {
            db.run(`UPDATE Groups SET group_name = ? WHERE id = ?`, groupName, id, function(){
                if(err){
                    reject(err);
                }else{
                    resolve(`Group has been updated!`);
                }
            })
        })
    }
}

module.exports = Groups;