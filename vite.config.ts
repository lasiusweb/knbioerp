import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                products: resolve(__dirname, 'products/index.html'),
                services: resolve(__dirname, 'services/index.html'),
                about: resolve(__dirname, 'about/index.html'),
                admin: resolve(__dirname, 'admin/index.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
