
export default class UserService {
    constructor (url) {
      this.API_URL = "http://localhost:3000/api/" + url;
    }
      
    getUser(){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
    deleteUser(){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            },
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }

    updateUser(user){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body:user
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
  
}
  