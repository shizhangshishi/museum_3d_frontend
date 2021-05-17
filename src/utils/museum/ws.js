const MessageTypes = {
    "online": 1,
    "offline": 2,
    "list": 3,
    "chat": 4,
    "position": 5
}

export default class WS
{
    constructor(username)
    {
        this.connection = new WebSocket(`ws://localhost:8080/websocket/${username}`);
        this.connection.onopen = event => {
            this.connection.send('something');
        }
        
        this.setOnMessage();
        console.log("连接WS")
    }

    send(message)
    {
        this.connection.send(message);
    }

    setOnMessage()
    {
        this.connection.onmessage = (data) => {
            console.log(data);
        };
    }

    sendChatMessage(text, toUsername)
    {
        this.send({
            messageType: MessageTypes.chat,
            toUsername: toUsername,
            text: text
        });
    }

    sendChatMessageToAll(text)
    {
        this.sendChatMessage(text, 'All');
    }

    sendPosition(position)
    {
        this.send({
            messageType: MessageTypes.position,
            position: position
        });
    }
}