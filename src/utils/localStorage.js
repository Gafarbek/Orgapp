export function getProjects() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return currentUser?.projects || []
}

export function updatedProjects(callback) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const users = JSON.parse(localStorage.getItem('users')) || []

    if (!currentUser) return

    const updatedProjects = callback(currentUser.projects || [])

    const updatedUser = {
        ...currentUser,
        projects: updatedProjects
    }

    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    const updatedUsers = users.map(user =>
        user.email === currentUser.email ? updatedUser : user
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}

export function addProjects(proj) {
    updatedProjects(projects => [...projects, proj])
}

export function deleteProject(projectId) {
    updatedProjects(projects => projects.filter(p => p.id !== projectId))
}

export function saveProject(newList) {
    updatedProjects(() => newList)
}

export function deleteList(listId) {
    const projects =  getProjects()
    const currentId = localStorage.getItem('currentProjectId')
    const project = projects.find(p => p.id === currentId)

    if(!project || !project.lists) return

    project.lists = project.lists.filter(l => l.id !== listId)
    saveProject(projects)
}


//Все аккаунты
export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || []
}

// Сохранение акк
export function saveUser(user) {
    const users = getUsers()
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
}

// Проверка на копию
export function userExists(email) {
    const users = getUsers()
    return users.some(user => user.email === email)
}

// Поиск пользователся
export function userEnter(email, password) {
    const users = getUsers()
    return users.find(user => user.email === email && user.password === password)
}

// ВНИМАНИЕ: В реальном проекте хранить пароли в localStorage нельзя!!!