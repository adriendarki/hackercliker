const Sequelize = require("sequelize");
const database = "hackerclicker";

// const username = "hacker";
// const password = "D3b14nr0oT";
// const host = "10.33.15.42:3306";

const username = "root";
const password = "";
const host = "localhost";


const db = new Sequelize(`mysql://${username}:${password}@${host}/${database}`);
// const db = new Sequelize(database, username, password, {
//     // TODO change to local server
//     host: host,
//     dialect: "mysql",
// })

module.exports = db;


