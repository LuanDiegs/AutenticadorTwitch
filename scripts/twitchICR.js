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
        setLocalStorage("canal", inputNomeCanal.toLowerCase(), 60);
    }
}

function logaNaTwitch(){
    const oAuth = pegarStringEntre2Caracteres("token=", "&scope", document.location.hash, 6);
    const nomeCanal = getLocalStorage("canal");

    if(oAuth && nomeCanal){
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        const textoChat = document.getElementById("chat");
        const tituloChat = document.getElementById("chatTitulo");
        const canalCerto = nomeCanal;
        let mensagens = 0

        socket.addEventListener('open', (e) => {
            socket.send(`PASS oauth:${oAuth}`);
            socket.send(`NICK ${canalCerto}`);
            socket.send(`JOIN #${canalCerto}`);

            if(e.returnValue){
                textoChat.innerHTML = "Vinculado com sucesso!<br>";
                tituloChat.innerHTML = `Chat do ${canalCerto}`
            }
        })

        socket.addEventListener('message', (event) => {
            const nomeUsuario = pegarStringEntre2Caracteres("@", ".tmi.twitch.tv", event.data, 1);
            const msgChat = event.data.split(`PRIVMSG #${canalCerto} :`)[1];
            let componenteMensagem = "";

            socket.send(`PRIVMSG #${canalCerto} :cringe`);

            if(msgChat){
                const corRandom = "#"+((1<<24)*Math.random()|0).toString(16); 
                const simpleBar = new SimpleBar(document.getElementById('chat'));

                componenteMensagem = `<p class="mensagemCompleta"> ` + 
                    `<span class='usuario' style='color: ${corRandom}'>${nomeUsuario}</span>: `+ 
                    `<span class='mensagemChat'>${msgChat}</span></p>`;

                simpleBar.getContentElement().insertAdjacentHTML('beforeend', componenteMensagem);
                simpleBar.getScrollElement().scrollTop = 1000;
                mensagens++;
            }

            // Caso tiver mais de 10 mensagens, limpa as mensagens para não sobrecarregar o site
            if(mensagens > 20){
                setTimeout(() => {
                    textoChat.innerHTML = ""; 
                }, 2000);
                mensagens = 0;
            }
        });
    }
}
