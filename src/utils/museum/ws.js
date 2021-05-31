// 消息类型
const MessageTypes = {
    "online": 1,
    "offline": 2,
    "list": 3,
    "chat": 4,
    "position": 5
}

// Position类型消息的子类型
const SubTypes = {
    "my": 1,
    "all": 2,
    "item": 3
}

export default class WS
{
    constructor(username, player, environment)
    {
        this.username = username;
        this.player = player;
        this.environment = environment;

        this.connection = new WebSocket(`ws://localhost:8080/websocket/${username}`);
        
        this.setOnMessage();
        console.log("连接WS");
    }

    send(object)
    {
        this.connection.send(JSON.stringify(object));
    }

    setOnMessage()
    {
        this.connection.onmessage = (msg) => {
            console.log(msg);
            let data = JSON.parse(msg.data)
            switch(data.messageType)
            {
                case(MessageTypes.online):
                    // 有人上线时，广播发送自己保存的状态，并将其添加到本地状态中
                    this.sendAllPosition();
                    this.environment.addFriend(data.username);
                    break;
                case(MessageTypes.offline):
                    this.environment.removeFriend(data.username);
                    // 有人下线时，把他移除出本地状态，并移除模型
                    break;
                case(MessageTypes.list):
                    // 接收到玩家列表时，若只有自己一人，则锁定本地状态不再接受更新
                    if (data.onlineUsers.length == 1)
                    {
                        this.environment.block = true;
                    }
                    break;
                case(MessageTypes.chat):
                    // 收到聊天时显示在聊天栏里
                    break;
                case(MessageTypes.position):
                default:
                    // 收到位置信息时，更新本地状态
                    this.dealWithPositionMsg(msg, data);
                    break;
            }

            console.log("!"+this.username);
            console.log(this.environment.block);
            console.log(this.environment.status);
            console.log("?"+this.username);
        };
    }

    dealWithPositionMsg(msg, data)
    {
        switch(data.subType)
        {
            case(SubTypes.my):
                // 收到某玩家移动的信息
                this.environment.updateFriend(data.username, data.position);
                break;
            case(SubTypes.all):
                // 如果本地状态没有锁定，则将其更新为收到的状态信息，之后锁定不再接受更新
                if (!this.environment.block)
                {
                    this.environment.sync(data.status.friends, data.status.items);
                    this.environment.block = true;
                }
                break;
            case(SubTypes.item):
            default:
                // 收到物品状态改变的信息
                break;
        }
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

    sendMyPosition(position)
    {
        this.send({
            messageType: MessageTypes.position,
            subType: SubTypes.my,
            username: this.username,
            position: position
        });
    }

    sendAllPosition()
    {
        let friendsAndSelf = JSON.parse(JSON.stringify(this.environment.status.friends));
        friendsAndSelf[this.username] = {
            x: this.player.status.x,
            y: this.player.status.y,
            z: this.player.status.z,
            rotationY: this.player.status.rotationY,
        };
        this.send({
            messageType: MessageTypes.position,
            subType: SubTypes.all,
            status: {
                friends: friendsAndSelf,
                items: this.environment.status.items
            }
        });
    }
}