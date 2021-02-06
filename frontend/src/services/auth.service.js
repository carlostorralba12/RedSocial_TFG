
export default class AuthService {
  constructor (url) {
    this.API_URL = "http://localhost:3000/api/" + url;
  }
    
  register(user){
    return fetch(this.API_URL, {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: user
    }).then(function (respuesta) {
        if (respuesta.ok)
            return respuesta.json();
    })
  }
}
