"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const LuckyNumberGame_1 = __importDefault(require("./LuckyNumberGame"));
const port = 3000;
class App {
    constructor(port) {
        this.port = port;
        const app = (0, express_1.default)();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        this.server = new http_1.default.Server(app);
        this.io = new socket_io_1.default.Server(this.server);
        //istanzio game
        this.game = new LuckyNumberGame_1.default();
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            //il game 
            this.game.LuckyNumbers[socket.id] = Math.floor(Math.random() * 10);
            //emit 
            socket.emit('message', 'Ciao Utente:' + socket.id +
                'Il tuo numero fortunato è' + this.game.LuckyNumbers[socket.id]);
            //brodcast
            socket.broadcast.emit('message', 'tutti gli altri dicono ciao a ' + socket.id);
            //-------------IO EMIT--------
            //Invia un messaggio a tutte le prese collegate. 
            //Utilizzato più spesso quando si verifica un evento a livello di server, 
            //ad esempio, si è verificato un evento timer e si desidera inviare un messaggio
            // a tutti i client.
            setInterval(() => {
                this.io.emit('random', Math.floor(Math.random() * 10));
            }, 1000);
            //parte il gioco 
            setInterval(() => {
                let randomNumber = Math.floor(Math.random() * 10);
                let winners = this.game.GetWinners(randomNumber);
                if (winners.length) {
                    winners.forEach((w) => {
                        this.io.to(w).emit('message', '*** You are the winner ***');
                    });
                }
                this.io.emit('random', randomNumber);
            }, 1000);
            socket.on('message', (msg) => {
                console.log(msg);
            });
            //quando il socket si disocnnette
            socket.on('disconnect', () => {
                console.log('utente disconnesso ' + socket.id);
            });
        });
    }
    Start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}.`);
    }
}
new App(port).Start();
//# sourceMappingURL=server.js.map