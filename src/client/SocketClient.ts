

export class SocketClient{
    private socket: SocketIOClient.Socket;

    constructor(){
        this.socket = io();

        this.socket.on('message',(msg: any)=>{
            console.log(msg);
            document.body.innerHTML = msg+'<br>';
        })

        this.socket.on('random',(number: any)=>{
            
            document.body.innerHTML+='<div>il numero estratto a caso è '+number+'</div><hr>';
        })
    }
}