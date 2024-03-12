var rand = function() {return Math.random().toString(36).substr(2);};
var token = function() {return rand() + rand();};
var host = window.location.host;

const urlVincular = "https://id.twitch.tv/oauth2/authorize?"+
    "response_type=token&"+
    "client_id=r007sc1iyvfsezaybfa5lfcw9gw62k&"+
    `redirect_uri=http://${host}&`+
    "scope=chat%3Aread&"+
    `state=${token()}`;

document.getElementById("botaoVincular").href = urlVincular;

const nomeCanalSalvo = getLocalStorage("canal");
if(nomeCanalSalvo) document.getElementById("canal").value = nomeCanalSalvo;