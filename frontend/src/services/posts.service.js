export default class PostsService {
    constructor (idCom, idDis) {
      this.API_URL = "http://localhost:3000/api/community/" +idCom + "/discussion/" + idDis + '/posts';
    }

    savePost(post){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body:post
        }).then(function (respuesta) {
            //console.log(respuesta);
            if (respuesta.ok)
                return respuesta.json();
        })
    }

    deletePost(id){
        this.API_URL += "/" + id;
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

}