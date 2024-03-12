logaNaTwitch();

function pegarStringEntre2Caracteres(inicio, fim, texto, quantidadeCaracteresPular){
    return texto.substring(
        texto.indexOf(inicio) + quantidadeCaracteresPular, 
        texto.lastIndexOf(fim)
    );
}

function salvaNomeCanal(){
    const inputNomeCanal = document.getElementById("canal").value;

    if(inputNomeCanal){
        localStorage.setItem("canal", inputNomeCanal.toLowerCase());
    }
}

function logaNaTwitch(){
    const oAuth = pegarStringEntre2Caracteres("token=", "&scope", document.location.hash, 6);
    const nomeCanal = localStorage.getItem("canal");

    if(oAuth && nomeCanal){
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        const textoChat = document.getElementById("chat");
        const canalCerto = nomeCanal;
        console.log(canalCerto);
        socket.addEventListener('open', (e) => {
            socket.send(`PASS oauth:${oAuth}`);
            socket.send(`NICK ${canalCerto}`);
            socket.send(`JOIN #${canalCerto}`);

            if(e.returnValue){
                textoChat.innerHTML = "Vinculado com sucesso!<br>";
            }
        })

        socket.addEventListener('message', (event) => {
            const nomeUsuario = pegarStringEntre2Caracteres("@", ".tmi.twitch.tv", event.data, 1);
            const msgChat = event.data.split(`PRIVMSG #${canalCerto} :`)[1];
            let msgWeb = "";

            if(msgChat){
                msgWeb = nomeUsuario + ": " + msgChat + "<br>";
            }

            textoChat.innerHTML += msgWeb;
        });
    }
}
