

export class SocketClient{
    private socket: SocketIOClient.Socket;

    constructor(){
        this.socket = io();

        this.socket.on('message',(msg: any)=>{
            console.log(msg);
            document.body.innerHTML = msg;
        })
    }
}