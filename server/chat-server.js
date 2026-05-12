import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket chat server escuchando en ws://localhost:${PORT}`);

const broadcast = (payload) => {
    const msg = JSON.stringify(payload);
    for (const client of wss.clients) {
        if (client.readyState === 1) client.send(msg);
    }
};

wss.on('connection', (socket) => {
    console.log('Cliente conectado. Total:', wss.clients.size);

    socket.on('message', (raw) => {
        let data;
        try {
            data = JSON.parse(raw.toString());
        } catch {
            return;
        }

        const user = (data.user || 'Anónimo').toString().trim();

        if (data.type === 'join') {
            socket.username = user;
            broadcast({ type: 'system', text: `${user} se unió al chat`, time: new Date().toISOString() });
            return;
        }

        const text = (data.text || '').toString().trim();
        if (!text) return;

        broadcast({ user, text, time: new Date().toISOString() });
    });

    socket.on('close', () => {
        if (socket.username) {
            broadcast({ type: 'system', text: `${socket.username} abandonó el chat`, time: new Date().toISOString() });
        }
        console.log('Cliente desconectado. Total:', wss.clients.size);
    });
});
