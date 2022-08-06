

export class SocketClient{
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io()

        this.socket.on('connect', function () {
            console.log('connect')
        })

        this.socket.on('disconnect', function (message: any) {
            console.log('disconnect ' + message)
            document.body.innerHTML +=
                'Disconnected from Server : ' + message + '<br/>'
            location.reload();
        })

    }
}