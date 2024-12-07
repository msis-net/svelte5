import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: any) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
				credentials: true
			},
			path: '/socket.io'
		});

		io.of('/rtc').on('connection', (socket) => {
			const username = `User ${Math.round(Math.random() * 999_999)}`;
			console.log('接続', username);
			socket.emit('name', username);

			socket.on('message', (message) => {
				console.log('受信', message);
				io.of('/rtc').emit('message', {
					from: username,
					message: message,
					time: new Date().toLocaleString()
				});
			});

			socket.on('disconnect', () => {
				console.log('切断', username);
			});
		});

		console.log('Socket.IO server initialized on /socket.io path');
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	preview: {
		port: 4173,
		host: true
	}
});
