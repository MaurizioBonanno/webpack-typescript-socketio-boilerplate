

export class SocketClient{
    private socket: SocketIOClient.Socket;

    constructor(){
        this.socket = io();
    }
}