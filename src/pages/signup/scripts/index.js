import { userExists, saveUser } from "../../../utils/localStorage"

const form =  document.forms.reg

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = {}
    const fn = new FormData(form)
    
    fn.forEach((value, key) => {
        user[key] = value
    })
    
    if(userExists(user.email)) {
        alert('Такой пользовател есть')
        return
    }

    console.log(user);
    

    saveUser(user)
    window.location.href = '/signin'
})
