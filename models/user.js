const db = require('./database'); //db data가져와서 create pool
module.exports = {
    AddUser: async function(user) {
        try {
            const result = await db.query('INSERT INTO user SET ?', user);
            return {result: result, error: null};
        } catch (error) {
            return {result: null, error: error};
        }
    },
    GetUser: async function(id) {
        try{
            const result = await db.query('SELECT * FROM user WHERE id=?',id);
            return {result:result, error:null};
        }catch(error){
            return {result:null, error:error};
        }
    },
}