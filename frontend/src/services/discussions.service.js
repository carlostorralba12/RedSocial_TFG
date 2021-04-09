
export default class DiscussionsService {
    constructor (id) {
      this.API_URL = "http://localhost:3000/api/community/" +id + "/";
    }

    getDiscussions(){
        this.API_URL += "discussions"
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

    saveDiscussion(discussion){
        this.API_URL += "discussion"
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body:discussion
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }


}