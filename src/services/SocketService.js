import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

class ServiceSocket {
    constructor() {
        this.serverUrl = 'http://localhost:8088/ws';
        this.stompClient = null;
        this.user = null;
        this.subscriptions = {};
    }

    connect(callbacks = {}) {
        const socket = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);
            if (callbacks.onConnect) {
                callbacks.onConnect();
            }
        }, error => {
            console.error('Connection error: ' + error);
            if (callbacks.onError) {
                callbacks.onError(error);
            }
        });
    }

    addUser(user) {
        this.user = user;
        this.sendMessage('/app/addUser', user);
    }

    disconnect() {
        if (this.stompClient) {
            this.sendMessage('/app/disconnectUser', this.user);
            this.stompClient.disconnect();
            console.log("Disconnected");
        }
    }


    subscribeToUserMessages(callback) {
        const subscriptionId = `/user/${this.user.nickName}/queue/messages`;
        console.log(`Subscribing to ${subscriptionId}`);
        this.subscriptions[subscriptionId] = this.stompClient.subscribe(subscriptionId, message => {
            callback(JSON.parse(message.body));
        }, error => {
            console.error(`Error subscribing to ${subscriptionId}:`, error);
        });
    }


    unsubscribeFromUserMessages() {
        const subscriptionId = `/user/${this.user.nickName}/queue/messages`;
        if (this.subscriptions[subscriptionId]) {
            this.subscriptions[subscriptionId].unsubscribe();
            delete this.subscriptions[subscriptionId];
            console.log(`Unsubscribed from ${subscriptionId}`);
        }
    }

    sendMessage(destination, message) {
        this.stompClient.send(destination, JSON.stringify(message), {});
    }

    sendChatMessage(chatMessage) {
        this.sendMessage('/app/chat', chatMessage);
    }

    async fetchChatHistory(senderId, recipientId) {
        const response = await fetch(`http://localhost:8088/messages/${senderId}/${recipientId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch chat messages');
        }
        return await response.json();
    }


    fetchActiveUsers = async () => {
        try {
            const response = await fetch('http://localhost:8088/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch active users:", error);
            return []; // Return an empty array in case of failure
        }
    };


    subscribeToPublic(callback) {
        const subscriptionId = `/user/public`;
        console.log(`Subscribing to public`);
        this.subscriptions[subscriptionId] = this.stompClient.subscribe(subscriptionId, message => {
            callback(JSON.parse(message.body));
        }, error => {
            console.error(`Error subscribing to ${subscriptionId}:`, error);
        });
    }


    unsubscribeFromPublic() {
        const subscriptionId = `/user/public`;
        if (this.subscriptions[subscriptionId]) {
            this.subscriptions[subscriptionId].unsubscribe();
            delete this.subscriptions[subscriptionId];
            console.log(`Unsubscribed from public`);
        }
    }

}

const serviceSocket = new ServiceSocket();
export default serviceSocket;