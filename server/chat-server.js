import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket chat server escuchando en ws://localhost:${PORT}`);

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
        const text = (data.text || '').toString().trim();

        if (!text) return;

        const payload = JSON.stringify({
            user,
            text,
            time: new Date().toISOString(),
        });

        for (const client of wss.clients) {
            if (client.readyState === 1) client.send(payload);
        }
    });

    socket.on('close', () => {
        console.log('Cliente desconectado. Total:', wss.clients.size);
    });
});
