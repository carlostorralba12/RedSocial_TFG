export default class ImageService {
    constructor (url) {
        this.API_URL = "http://localhost:3000/api/image/" + url;
    }

    storeImage(image) {
        return fetch(this.API_URL, {
            method: 'POST',
            body: image
        }).then(function (res) {
            if(res.ok)
                return res.json();
        });
    }

    getImage(){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then(function(res) {
            if(res.ok){
                return res.json();
            }
        })
    }

    deleteImage(){
        var token = localStorage.getItem("token");
        return fetch(this.API_URL, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        }).then(function(res) {
            if(res.ok){
                return res.json();
            }
        })
    }

}