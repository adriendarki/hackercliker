var UserInfos = (function() {
    var id = ''

    var getId = function() {
      return id;
    };
  
    var setId = function(id) {
        console.log("setter")
      this.id = id;  
    };
  
    return {
      getId: getId,
      setId: setId
    }
  
  })();
  
  export default UserInfos;