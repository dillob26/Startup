const websocket = require('ws');

function peer_proxy(http_server) {
  const socket_server = new websocket.WebSocketServer({ server: http_server });

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

module.exports = { peer_proxy };