/* eslint-disable no-undef */
const ServerError = require("../lib/errors/ServerError");
const users = require("../models/User");
const md5 = require("md5");
const db = require("../db.js");
const dbCall = require('../functions/dbCall');
const socketsFct = require('../functions/socket');

module.exports = {
  register(req, res, next) {
    let newId;
    const username = req.query.username;
    let password = req.query.password;
    let email = md5(req.query.email);
    console.log(username, password, email);
    db.query("select id+1 AS id from users ORDER BY id desc LIMIT 1")
    .then((dbId) => {
      newId = dbId[0][0].id || 1;
      const date = Date.now();
      console.log(date);
      Promise.all([
        db.query("INSERT INTO users (id, pseudo, email, password) VALUES (?, ?, ?, ?)", {replacements: [newId, username, email, md5(password)]}),
        db.query("INSERT INTO stats (user_id, register_date, last_connection) VALUES (?, ?, ?)", {replacements: [newId, date, date]}),
      ])
      .then(() => {
        console.log('nice');
        res.json({Status: "success", id: newId});
      })
      .catch((err) => {
        console.log('failed');
        res.json({Status: "failed"});
      })
    });

  },

  async getEnemy(req, res, next){
    let userId;
    try{
        userId = parseInt(req.params.userId);
    } catch(err){
        throw new ServerError("bad id");
    }
    //db, userId, potentialEnemieIds, dificulty = 5
    // en vrai faut recup les ids des gens connectés au socket :/
    let userList = [];
    for(let i = 1; i < 50; i++){userList.push(i);}
    res.json(await socketsFct.getUserToRaid(db, userId, userList));

  },

  tryLogin(req, res, next){
    const username = req.query.username;
    let password = req.query.password;
    
    db.query("SELECT id, password FROM users WHERE pseudo = ?", {replacements: [username]})
    .then((datas) => {
      dbPassword = datas[0][0].password;
      password = md5(password);
      if(password === dbPassword){
        console.log('le id du user est ', datas[0][0].id)
        res.end(`${datas[0][0].id}`);
      }else{
        res.end('failed');
      }
    })
  },

  updateCombatResult(req, res, next){
    let winnerId, looserId, niveauWinner, niveauLooser;
    try{
        winnerId = parseInt(req.query.winner);
        looserId = parseInt(req.query.looser);
    } catch(err){
        throw new ServerError("bad id");
    }

    async function getWinner(id) {
      await db.query("SELECT niveau FROM users WHERE id = ?", {replacements: [id]})
      .then((datas) => {
        const niveau = datas[0][0].niveau
        niveauWinner = niveau +1;})
      .catch((err) => {throw new ServerError("Database error, something went wrong with winner user");});
    }
    async function getLooser(id) {
      await db.query("SELECT niveau FROM users WHERE id = ?", {replacements: [id]})
      .then((datas) => {
        const niveau = datas[0][0].niveau
        niveauLooser = niveau < 2 ? 0 : niveau -1;
      })
      .catch((err) => {throw new ServerError("Database error, something went wrong with looser user");});
    }

    // la fonction d'appel global qui attend les retours de toutes
    async function all() {
        await Promise.all([getWinner(winnerId), getLooser(looserId)])
        .then(async () => {
            return await Promise.all(
              db.query("UPDATE users SET niveau = ? WHERE id = ?", {replacements: [niveauWinner, winnerId]}),
              db.query("UPDATE users SET niveau = ? WHERE id = ?", {replacements: [niveauLooser, looserId]}),
            ).then(res.end("ok"))
        })
        .catch((err) => {res.end(err); next(err);});
    }
    
    // c'est partit
    all();
  },

  getCombatUsersInfos(req, res, next){
    const combatUsers = {
      attacker: {},
      defender: {},
    };
    let attackerId, defenderId;
    try{
      attackerId = parseInt(req.query.attacker);
      defenderId = parseInt(req.query.defender);
    } catch(err){
      throw new ServerError("bad id");
    }
    async function getAttacker(){
      await dbCall.getInfosForCombatUser(db, attackerId)
      .then((user) => {
        combatUsers.attacker = user;
      })
    }
    async function getDefender(){
      await dbCall.getInfosForCombatUser(db, defenderId)
      .then((user) => {
        combatUsers.defender = user;
      })
    }

    async function all() {
      await Promise.all([getAttacker(), getDefender()])
      .then(() => {
          res.send(combatUsers);
      })
      .catch((err) => {res.end(err); next(err);});
    }
  
  // c'est partit
  all();
  },

  updateUserInfos(req, res, next){
    let userId, money, infected;
    try{
      userId = parseInt(req.params.userId);
      money = parseInt(req.query.money);
      infected = parseInt(req.query.infected);
    } catch(err){
      throw new ServerError("bad infos");
    }
    db.query("UPDATE stats SET moneyActual = ?, infectTot = ?, last_connection = ? WHERE user_id = ?", {replacements: [money, infected, Date.now(), userId]})
    .then(() => { res.end(); })
    .catch(() => { res.end(); })

  },

  amIUnderAttack(req, res, next){
    let userId;
    try{
      userId = parseInt(req.params.userId);
    } catch(err){
      throw new ServerError("bad infos");
    }
    db.query("SELECT attackerId FROM combats WHERE defenderId = ?", {replacements: [userId]})
    .then((datas) => {
      const data = datas[0][0];
      if(data === undefined){res.json({attacker: "none"})}
      res.json(data);
    })

  }
}
