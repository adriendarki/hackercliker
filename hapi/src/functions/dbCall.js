/**
 * Renvoie les infos neccesaire pour la gestion des combat
 * @param {Object} db - database object 
 * @param {Integer} userId - id de l'user ciblé 
 */
function getInfosForCombatUser(db, userId){
    return db.query("SELECT id, pseudo, niveau, exp, attaque, defense FROM users WHERE id = ?", {replacements: [userId]})
    .then((datas) => {return datas[0][0];});
}

/**
 * Renvoie les users potentiellement adversaires de l'utilisateur renseigné
 * @param {Object} db - un object DataBase
 * @param {Integer} userId - id de l'utilisateur declencheur du raid
 * @param {Integer[]} potentialEnemieIds - array d'id des users disponnibles coté serveur
 * @param {Integer} dificulty - tranche de niveau autour du level du joueur pour lui trouver des adversaires
 */
function getUserToRaid(db, userId, potentialEnemieIds, dificulty){
    return db.query("SELECT id FROM users WHERE niveau BETWEEN ( SELECT niveau-:dificulty FROM users WHERE id = :userId) AND ( SELECT niveau+:dificulty FROM users WHERE id = :userId) AND id != :userId"
        ,{replacements: {userId, dificulty}})
}


module.exports = { getInfosForCombatUser, getUserToRaid };