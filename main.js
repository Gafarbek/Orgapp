import { router } from "./src/router/router.js";

const sidebar = document.getElementById('sidebar')
const pathname = window.location.pathname
const userAvatar = document.querySelector('.userAvatar')
const span = document.getElementById('firstLatterUserName')
const header = document.querySelector('header')


if(pathname === '/' || pathname === '/signin') {
    sidebar.style.display = 'none'
}

const currentUser = JSON.parse(localStorage.getItem('currentUser'))


if(currentUser) {
    userAvatar.classList.remove('hidden')
    
    const firstLatter = currentUser.name?.[0]?.toUpperCase() || ''
    span.textContent = firstLatter
} else {
    header.style.justifyContent = 'center'
}

router()