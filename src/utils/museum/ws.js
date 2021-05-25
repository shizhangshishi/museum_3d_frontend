const MessageTypes = {
    "online": 1,
    "offline": 2,
    "list": 3,
    "chat": 4,
    "position": 5
}

export default class WS
{
    constructor(username, token)
    {
        console.log(token);
        this.username = username;
        this.connection = new WebSocket(`ws://localhost:8080/websocket`, [token]);
        
        this.setOnMessage();
        console.log("连接WS")
    }

    send(object)
    {
        this.connection.send(JSON.stringify(object));
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
            fromUsername: this.username,
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