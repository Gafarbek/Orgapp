import { getUsers } from "../../../utils/localStorage"

const form = document.forms.sign

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = {}
    const fn = new FormData(form)

    fn.forEach((value, key) => {
        user[key] = value
    })

    const users = getUsers()
    const foundUser = users.find(u => u.email === user.email && u.password === user.password)

    if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser))
        window.location.href = '/'
    } else {
        alert('Ошибка входа')
    }

    window.location.href = '/home'
})
