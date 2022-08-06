import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            //emit 
            socket.emit('message' , 'Ciao Utente:'+socket.id);

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