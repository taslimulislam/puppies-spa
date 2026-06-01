import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');

function resolvePage(name: string) {
    const pattern = new RegExp(
        `^\\./Pages/${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.(tsx|jsx)$`,
        'i',
    );

    const path = Object.keys(pages).find((key) => pattern.test(key));

    if (!path) {
        throw new Error(
            `Page not found: ${name} (expected ./Pages/${name}.tsx or ./Pages/${name}.jsx)`,
        );
    }

    return pages[path]();
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePage(name),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
