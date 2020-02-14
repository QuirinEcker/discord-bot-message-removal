const mysql = require('mysql');

class DataBase {

    constructor(host, user, password) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.con = mysql.createConnection({
            host: host,
            user: user,
            password: password
        })
    }

    doSQL(sql) {
        this.con.connect(() => {
            this.con.query(sql, err => {
                if (err) console.error(err);
            })
        })
    }
}

DataBase.instance = new DataBase("localhost", "postgres", "postgres");
module.exports = DataBase;