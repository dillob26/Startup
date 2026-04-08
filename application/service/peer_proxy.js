const websocket = require('ws');

let socket_server;

function peer_proxy(http_server) {
  socket_server = new websocket.WebSocketServer({ server: http_server });

    socket_server.on('connection', (socket) => {
        socket.is_alive = true;

        socket.on('message', function message(data) {
            socket_server.clients.forEach((client) => {
                if (client !== socket && client.readyState === websocket.WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        socket.on('pong', () => {
            socket.is_alive = true;
        });
    });

    setInterval(() => {
        socket_server.clients.forEach(function each(client) {
            if (client.is_alive === false) return client.terminate();

            client.is_alive = false;
            client.ping();
        });
    }, 10000);
}

function broadcast(data) {
    if (!socket_server) return;

    socket_server.clients.forEach((client) => {
        if (client.readyState === websocket.WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}


module.exports = { peer_proxy , broadcast };