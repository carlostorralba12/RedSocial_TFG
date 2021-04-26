
export default class UserService {
    constructor (url) {
      this.API_URL = "http://localhost:3000/api/" + url;
    }
      
    getUser(id){
        var url = this.API_URL + id;
        var token = localStorage.getItem("token");
        return fetch(url, {
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
    getProfile(){
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
    deleteUser(id){
        var url = this.API_URL + id;
        var token = localStorage.getItem("token");
        return fetch(url, {
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

    updateUser(user,id){
        var url = this.API_URL + id;
        var token = localStorage.getItem("token");
        return fetch(url, {
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
    saveUser(user){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'POST',
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

    getUsers(){
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
    followCommunity(idFollow, id){
        var url = this.API_URL + id + '/follow/community/';
   
        var token = localStorage.getItem("token");
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: idFollow

        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
    unfollowCommunity(idFollow, id){
        var url = this.API_URL + id + '/unfollow/community/';
   
        var token = localStorage.getItem("token");
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: idFollow

        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
    followUser(idFollow, id){
        var url = this.API_URL + id + '/follow/user/';
   
        var token = localStorage.getItem("token");
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: idFollow

        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
    unfollowUser(idUnfollow, id){
        var url = this.API_URL + id + '/unfollow/user/';

        var token = localStorage.getItem("token");
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: idUnfollow

        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
  
}
  