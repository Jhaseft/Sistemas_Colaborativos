import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || auth?.guest_name || 'Anónimo';

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [status, setStatus] = useState('Conectando...');
    const wsRef = useRef(null);
 
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        wsRef.current = ws;

        ws.onopen = () => {
            setStatus('Conectado al servidor');
            ws.send(JSON.stringify({ type: 'join', user: userName }));
        };
        ws.onclose = () => setStatus('Desconectado');
        ws.onerror = () => setStatus('Error de conexión');
        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                setMessages((prev) => [...prev, msg]);
            } catch {}
        };

        return () => ws.close();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        if (wsRef.current?.readyState !== 1) return;

        wsRef.current.send(JSON.stringify({ user: userName, text: trimmed }));
        setText('');
    };

    const formatTime = (iso) => {
        try {
            return new Date(iso).toLocaleTimeString();
        } catch {
            return '';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Chat en tiempo real
                </h2>
            }
        >
            <Head title="Chat" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-2 text-sm text-gray-600">
                                Usuario: <span className="font-semibold">{userName}</span> · Estado:{' '}
                                <span className="font-semibold">{status}</span>
                            </div>

                            <div className="h-80 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-3">
                                {messages.length === 0 && (
                                    <p className="text-sm text-gray-500">Aún no hay mensajes.</p>
                                )}
                                {messages.map((m, i) =>
                                    m.type === 'system' ? (
                                        <div key={i} className="mb-1 text-center text-xs italic text-gray-400">
                                            {m.text}
                                        </div>
                                    ) : (
                                        <div key={i} className="mb-1 text-sm">
                                            <span className="text-gray-400">[{formatTime(m.time)}]</span>{' '}
                                            <span className="font-semibold">{m.user}:</span> {m.text}
                                        </div>
                                    )
                                )}
                            </div>

                            <form onSubmit={sendMessage} className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!text.trim()}
                                    className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
