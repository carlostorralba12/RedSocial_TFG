
export default class CommunityService {
    constructor () {
      this.API_URL = "http://localhost:3000/api/community/";
    }
    saveCommunity(community){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body:community
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
    getCommunities(){
        this.API_URL = "http://localhost:3000/api/communities";
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
    getCommunity(id){
        this.API_URL = this.API_URL + id;
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
    deleteCommunity(id){
        this.API_URL = this.API_URL + id;
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

    updateCommunity(id,community){
        this.API_URL = this.API_URL + id;
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body:community
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }
  
}
  