import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import LuckyNumbersGame from './LuckyNumberGame'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server
    private game: LuckyNumbersGame;//variabile game

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)
        //istanzio game
        this.game = new LuckyNumbersGame();

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            //il game 
            this.game.LuckyNumbers[socket.id] = Math.floor(Math.random()*10);
            //emit 
            socket.emit('message' , 'Ciao Utente:'+socket.id+
            'Il tuo numero fortunato è'+this.game.LuckyNumbers[socket.id]);
            //brodcast
            socket.broadcast.emit('message','tutti gli altri dicono ciao a '+socket.id);
             //-------------IO EMIT--------
            //Invia un messaggio a tutte le prese collegate. 
            //Utilizzato più spesso quando si verifica un evento a livello di server, 
            //ad esempio, si è verificato un evento timer e si desidera inviare un messaggio
            // a tutti i client.
            setInterval(()=>{
                this.io.emit('random',Math.floor(Math.random()*10))
            },1000);

            //parte il gioco 
            setInterval(() => {
                let randomNumber: number = Math.floor(Math.random() * 10)
                let winners: string[] = this.game.GetWinners(randomNumber)
                if (winners.length) {
                    winners.forEach((w) => {
                        this.io.to(w).emit('message', '*** You are the winner ***')
                    })
                }
                this.io.emit('random', randomNumber)
            }, 1000)

            socket.on('message',(msg)=>{
                console.log(msg);
            })

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