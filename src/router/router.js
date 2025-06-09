import { routes } from "./routers"

async function renderPagesNotFound(app) {
    const response = await fetch('src/pages/404/index.html')
    const page = await response.text()

    app.innerHTML = page
}

export async function router() {
    const pathname = window.location.pathname
    const app = document.getElementById('app')

    const route = routes.find((r) => pathname.match(r.path))

    if(!route) {
        return await renderPagesNotFound(app)
    }

    await route.loadStyles()
    await route.view(app)

    await route.loadScripts()
}