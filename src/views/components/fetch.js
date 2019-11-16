const baseUrl = "http://localhost:8080/";
module.exports ={
    
    async httpGetRequest(url){
        url = baseUrl+url;
        return fetch(url).then(response => response.json());
    },

    async httpPostRequest(url, body){
        url = baseUrl+url;
        return fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}});

    },

    

    async updateUserInfo(userId, money, infected){
        const url = `${baseUrl}update/user/${userId}?money=${money}&infected=${infected}`;
        return fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}});

    },

} 
