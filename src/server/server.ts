import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import LuckyNumbersGame from './LuckyNumberGame'
import RandomScreenNameGenerator from './randomScreenNameGenerator'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server
    private game: LuckyNumbersGame;//variabile game
    private randomScreenGenerator: RandomScreenNameGenerator;

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use(
            '/jquery',
            express.static(
                path.join(__dirname, '../../node_modules/jquery/dist')
            )
        )
        app.use(
            '/bootstrap',
            express.static(
                path.join(__dirname, '../../node_modules/bootstrap/dist')
            )
        )

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)
        //istanzio game
        this.game = new LuckyNumbersGame();

                    //istanzio randomScreenGenerator
         this.randomScreenGenerator = new RandomScreenNameGenerator();

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            let screenName = this.randomScreenGenerator.generateRandomScreenName();
             socket.emit('screenName',screenName);
             console.log('ho inviato screenName:'+screenName.name);

            //quando il socket si disocnnette
            socket.on('disconnect',()=>{
                console.log('utente disconnesso '+socket.id);
            });

            //evento chatMessage
            socket.on('chatMessage',(chatMessage: ChatMessage)=>{
                socket.broadcast.emit('chatMessage',chatMessage)
            })

            
        })
    }

    public Start() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }
}

new App(port).Start()