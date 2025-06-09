export const routes = [
    {
        path: /^\/$/,
        view: async (app) => {
            const response = await fetch('src/pages/signup/index.html');

            app.innerHTML = await response.text();
        },
        loadStyles: async () => {
            await import('../pages/signup/styles/index.css');
        },
        loadScripts: async () => {
            await import('../pages/signup/scripts/index.js');
        }
    },
    {
        path: /^\/signin$/,
        view: async (app) => {
            const response = await fetch('src/pages/signin/index.html');

            app.innerHTML = await response.text();
        },
        loadStyles: async () => {
            await import('../pages/signin/styles/index.css');
        },
        loadScripts: async () => {
            await import('../pages/signin/scripts/index.js');
        }
    },
    {
        path: /^\/home$/,
        view: async (app) => {
            const response = await fetch('src/pages/home/index.html');

            app.innerHTML = await response.text();
        },
        loadStyles: async () => {
            await import('../pages/home/styles/index.css');
        },
        loadScripts: async () => {
            await import('../pages/home/scripts/index.js');
        }
    },
    {
        path: /^\/allLists$/,
        view: async (app) => {
            const response = await fetch('src/pages/allLists/index.html');

            app.innerHTML = await response.text();
        },
        loadStyles: async () => {
            await import('../pages/allLists/styles/index.css');
        },
        loadScripts: async () => {
            await import('../pages/allLists/scripts/index.js');
        }
    },
]

