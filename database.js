const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    database:'backend',
    password:'camindo'

});
