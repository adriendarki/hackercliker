const dbCall = require('./dbCall');
/**
 * 
 * @param {Object} db - un object DataBase
 * @param {Integer} userId - id de l'utilisateur declencheur du raid
 * @param {Integer[]} potentialEnemieIds - array d'id des users disponnibles coté serveur
 * @param {Integer} dificulty - tranche de niveau autour du level du joueur pour lui trouver des adversaires
 */
function getUserToRaid(db, userId, potentialEnemieIds, dificulty = 5){
    return dbCall.getUserToRaid(db, userId, potentialEnemieIds, dificulty)
    .then((datas) => {
        // console.log(datas);
        const ids = datas[0].map(user => user.id);
        // console.log(ids);
        if(ids.length === 0) return -1;

        // console.log(potentialEnemieIds);
        let userToRaid = -1;
        const raidableUsers = [];
        for(const potentialId of potentialEnemieIds) {
            if(potentialId !== userId && ids.indexOf(potentialId) !== -1){
                raidableUsers.push(potentialId);
            }
        }
        // console.log(raidableUsers);
        if(raidableUsers.length === 0) return -1;

        return raidableUsers[parseInt(Math.random() * raidableUsers.length, 10)];

    })
    .catch((err) => {
        return -2;
    })
}

function getInfoForCombatStart(db, attackerId, defenderId){
    return Promise.all([
        dbCall.getInfosForCombatUser(db, attackerId),
        dbCall.getInfosForCombatUser(db, defenderId),
    ])
    .then((datas) => {
        return datas;
    })
}

module.exports = { getUserToRaid, getInfoForCombatStart };
