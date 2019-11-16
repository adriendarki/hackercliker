const ServerError = require("../lib/errors/ServerError");
const Article = require("../models/User");
const bodyParser = require("body-parser");
const db = require("../db.js");
// md5 example 
// // console.log(md5("string"));


module.exports = {
  getGlobalInfosForUserId(req, res, next) {
    let userId;
    try{
        userId = parseInt(req.params.userId);
    } catch(err){
        throw new ServerError("bad id");
    }
    const dificulty = 5;
    let response = {
        userInfos: {},
        userModulesQuantity: {
            pc: [],
            virus: [],
        },
        modulesPc: [],
        modulesVirus: [],
        userStats: {},
        usersRaidable: {},
    };

    // les cinq fonctions pour recup les datas qu'on a besoin
    async function getUserInfos() {
        await db.query("SELECT pseudo, email, niveau, exp, port FROM users WHERE id = ?;", {replacements: [userId]})
        .then((datas) => {response.userInfos = datas[0][0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with user datas");});
    }
    async function getUserModulesPc() {
        await db.query("SELECT m.id, um.quantity, m.name, m.infection_per_sec, m.dollar_per_sec, m.research_cost, m.base_cost FROM users_modules um INNER JOIN modules m ON um.module_id = m.id WHERE um.user_id = ? and m.categorie = 0;", {replacements: [userId]})
        .then((datas) => {response.userModulesQuantity.pc = datas[0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with user modules (pc)");});
    }
    async function getUserModulesVirus() {
        await db.query("SELECT m.id, um.quantity, m.name, m.infection_per_sec, m.dollar_per_sec, m.research_cost, m.base_cost FROM users_modules um INNER JOIN modules m ON um.module_id = m.id WHERE um.user_id = ? and m.categorie = 1;", {replacements: [userId]})
        .then((datas) => {response.userModulesQuantity.virus = datas[0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with user modules (virus)");});
    }
    async function getModulesPcsInfos() {
        await db.query("SELECT * FROM modules WHERE categorie = 0 AND id NOT IN (SELECT module_id FROM users_modules WHERE user_id = ?) LIMIT 1;", {replacements: [userId]})
        .then((datas) => {response.modulesPc = datas[0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with pcs modules infos");});
    }
    async function getModulesVirusInfos() {
        await db.query("SELECT * FROM modules WHERE categorie = 1 AND id NOT IN (SELECT module_id FROM users_modules WHERE user_id = ?) LIMIT 1;", {replacements: [userId]})
        .then((datas) => {response.modulesVirus = datas[0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with virus modules infos");});
    }
    async function getUserStatsInfos() {
        await db.query("SELECT * FROM stats WHERE user_id = ?", {replacements: [userId]})
        .then((datas) => {response.userStats = datas[0][0];})
        .catch((err) => {throw new ServerError("Database error, something went wrong with user stats");});
    }

    // la fonction d'appel global qui attend les retours de toutes
    async function all() {
        Promise.all([getUserInfos(), getUserModulesPc(), getUserModulesVirus(), getModulesPcsInfos(), getModulesVirusInfos(), getUserStatsInfos()])
        .then(() => {
            res.send(response);
        })
        .catch((err) => {next(err);});
    }
    
    // c'est partit
    all();
  },

  researchAModuleById(req, res, next){
    let userId, moduleId;
    try{
        userId = parseInt(req.query.userId);
        moduleId = parseInt(req.query.moduleId);
    } catch(err){
        throw new ServerError("bad id");
    }
    db.query("INSERT INTO  users_modules (user_id, module_id, quantity) VALUES (?, ?, 1)", {replacements: [userId, moduleId]})
    .then((data) => {res.send('ok');})
    .catch((err) => {throw new ServerError("cannot unlock module");});
  },

  buyAMouleById(req, res, next){
    let userId, moduleId, quantity;
    try{
        userId = parseInt(req.query.userId);
        moduleId = parseInt(req.query.moduleId);
        quantity = parseInt(req.query.quantity);
    } catch(err){
        throw new ServerError("bad id");
    }
    db.query("UPDATE users_modules SET quantity = ? WHERE user_id = ? AND module_id = ?", {replacements: [quantity, userId, moduleId]})
    .then((data) => {res.send('ok');})
    .catch((err) => {throw new ServerError("cannot buy module");});
  },
}