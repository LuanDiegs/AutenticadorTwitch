logaNaTwitch();

function pegarStringEntre2Caracteres(inicio, fim, texto, quantidadeCaracteresPular){
    return texto.substring(
        texto.indexOf(inicio) + quantidadeCaracteresPular, 
        texto.lastIndexOf(fim)
    );
}

function logaNaTwitch(){
    const oAuth = pegarStringEntre2Caracteres("token=", "&scope", document.location.hash, 6);

    if(oAuth){
        const user = "zdziin";
        
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        
        socket.addEventListener('open', (e) => {
            socket.send(`PASS oauth:${oAuth}`);
            socket.send(`NICK ${user}`);
            socket.send(`JOIN #${user}`);

            if(e.returnValue){
                document.getElementById("chat").innerHTML = "Vinculado com sucesso!<br>";
            }
        })

        socket.addEventListener('message', (event) => {
            const textoChat = document.getElementById("chat");
            const nomeUsuario = pegarStringEntre2Caracteres("@", ".tmi.twitch.tv", event.data, 1);
            const msgChat = event.data.split(`PRIVMSG #${user} :`)[1];
            let msgWeb = "";

            if(msgChat){
                msgWeb = nomeUsuario + ": " + msgChat + "<br>";
            }

            textoChat.innerHTML += msgWeb;
        });
    }
}
