
type ChatMessage = {
    message: string
    from: string
}

type ScreenName = {
    name: string
    abbreviation: string
}

export class SocketClient{
    private socket: SocketIOClient.Socket;
    screenName: ScreenName;

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

        //evento chatMessage
        this.socket.on('chatMessage',(chatMessage: ChatMessage)=>{
            $('#messages').append(
                "<li><span class='float-right'><span class='circle'>"+
                chatMessage.from+
                "<span></span><div class='otherMessage'>"+
                chatMessage.message+"</div></li>"
            )
            this.scrollChatWindow();
        })

        //evento screenName
        this.socket.on('screenName',(screenName: ScreenName)=>{
            this.screenName = screenName;
            console.log('rcevuto screenName:'+this.screenName.name);
            $('.screenName').text(this.screenName.name+' '+this.screenName.abbreviation);
        })

        $(()=>{
            $('#messageText').keypress((e)=>{
                var key = e.which;
                if(key==13){
                    this.sendMessage();
                    return false;
                }
            })
        })

    }
    public sendMessage() {
        let messageText = $('#messageText').val()
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', <ChatMessage>{
                message: messageText,
                from: this.screenName.abbreviation,
            })

            $('#messages').append(
                "<li><span class='float-left'><span class='circle'>AB</span></span><div class='myMessage'>" +
                    this.screenName.abbreviation +
                    '</div></li>'
            )
            this.scrollChatWindow()

            $('#messageText').val('')
        }
    }
    scrollChatWindow() {
        $('#messages').animate({
            scrollTop: $('#messages li:last-child').position().top
        },500)
        setTimeout(()=>{
            let messagesLenght = $('#messages li')
            if(messagesLenght.length>10){
                messagesLenght.eq(0).remove();
            }
        },500)
    }

    public showGame(id: number){
        switch(id){
            case 0:
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel0').delay(100).fadeIn(100);
            break;
            case 1:
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel1').delay(100).fadeIn(100);
            break;
            case 2:
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel2').delay(100).fadeIn(100);
            break;
        }
    }
}