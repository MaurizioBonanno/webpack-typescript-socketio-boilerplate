import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import LuckyNumberGame from './LuckyNumberGame'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    //un oggetto game LuckyNumberGame
    private game: LuckyNumberGame;

    private io: socketIO.Server

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)
        //istanzio il game
        this.game = new LuckyNumberGame();

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            //uso il game
            this.game.LuckyNumber[socket.id]=Math.floor(Math.random()*10);

            //emit 
            socket.emit('message' , 'Ciao Utente:'+socket.id+" il tuo numero fortiunato è:"+this.game.LuckyNumber[socket.id]);
            //brodcast
            socket.broadcast.emit('message','tutti gli altri dicono ciao a '+socket.id);
             //-------------IO EMIT--------
            //Invia un messaggio a tutte le prese collegate. 
            //Utilizzato più spesso quando si verifica un evento a livello di server, 
            //ad esempio, si è verificato un evento timer e si desidera inviare un messaggio
            // a tutti i client.
            setInterval(()=>{
                let randomNumber: number = Math.floor(Math.random()*10);
                let winner: string[] = this.game.GetWinner(randomNumber);
                if(winner.length){
                    winner.forEach((w)=>{
                        this.io.to(w).emit('message','****SEI IL VINCITORE*****');
                    })
                }
                this.io.emit('random',randomNumber);
            },1000);

            //quando il socket si disocnnette
            socket.on('disconnect',()=>{
                console.log('utente disconnesso '+socket.id);
            });
        })
    }

    public Start() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }
}

new App(port).Start()