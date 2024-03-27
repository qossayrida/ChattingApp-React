import io from "socket.io-client";

const SERVER = "http://localhost:8080"; // Your Spring Boot server URL
let socket;

export const connectSocket = () => {
    socket = io(SERVER, { transports: ["websocket"] });

    socket.on("connect", () => {
        console.log("Connected to WebSocket server!");
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const subscribeToChat = (callback) => {
    if (!socket) return;

    socket.on("chatMessage", (message) => {
        callback(message);
    });
};

export const sendMessage = (message) => {
    if (socket) socket.emit("chatMessage", message);
};
