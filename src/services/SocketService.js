import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


let socket;

export const initializeWebSocket = () => {
    const socket = new SockJS('http://localhost:8088/ws');
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        this.setState({ stompClient, connected: true });

        stompClient.subscribe('/user/public', (response) => {
            const message = JSON.parse(response.body);
            console.log('Received message from server:', message);
        });
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
    });
};

export const addUser = (user) => {
    const { stompClient } = this.state;
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/user.addUser', {}, JSON.stringify(user));
    }
};

export const disconnectUser = (user) => {
    const { stompClient } = this.state;
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/user.disconnectUser', {}, JSON.stringify(user));
    }
};



