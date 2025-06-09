import { getProjects, saveProject } from "../utils/localStorage"

export function CreateProject(item, onDelete) {
    const listCardWrapper = document.createElement('div')
    listCardWrapper.classList.add('listCardWrapper')

    const cardHeader = document.createElement('div')
    cardHeader.classList.add('cardHeader')

    const menuWrapper = document.createElement('div')
    menuWrapper.classList.add('menuWrapper')

    const openMenu = document.createElement('button')
    openMenu.classList.add('openMenu')

    const dropMenu = document.createElement('div')
    dropMenu.classList.add('dropMenu', 'hidden')

    const img = document.createElement('img')

    const deletes = document.createElement('button')
    deletes.classList.add('delite')

    const addTask = document.createElement('button')
    addTask.classList.add('addTask')

    const cardList = document.createElement('div')
    cardList.classList.add('cardList')

    const nameText = document.createElement('span')
    nameText.id = 'chapterNameText'

    const input = document.createElement('input')
    input.id = 'chapterNameInput'

    const span = document.createElement('span')

    input.placeholder = item.title || 'List title'
    nameText.textContent = item.title || 'List title' 
    img.src = '/public/Минималистичная иконка мусорного ведра.png'
    deletes.textContent = 'Удалить'
    addTask.textContent = 'Добавить задачу'
    span.textContent = '+'
    openMenu.textContent = '•••'

    nameText.addEventListener('click', () => {
        nameText.style.display = 'none'
        input.style.display = 'inline-block'
        input.value = nameText.textContent
        input.focus()
    })

    input.addEventListener('blur', () => {
        const newValue = input.value.trim()
        if (newValue) {
            nameText.textContent = newValue
            
            const projects =  getProjects()
            const currentId = localStorage.getItem('currentProjectId')
            const project = projects.find(p => p.id === currentId)

            if(!project || !project.lists) return

            const list =  project.lists.find(l => l.id === item.id)

            if (list) {
                list.title = newValue
                saveProject(projects)
            }
        }

        nameText.style.display = 'inline-block'
        input.style.display = 'none'
    })

    input.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            input.blur()
        }
    })

    openMenu.addEventListener('click', (e) => {
        dropMenu.classList.toggle('hidden')

        document.querySelectorAll('.dropMenu').forEach(menu => {
            if(menu !== dropMenu) {
                menu.classList.add('hidden')
            }
        })
    })

    deletes.addEventListener('click', (e) => {
        e.stopPropagation()
        if (confirm(`Вы уверены, что хотите удалить раздел '${item.title}'?`)) {
            onDelete(item.id)
        }
    })


    deletes.prepend(img)
    dropMenu.append(deletes)
    menuWrapper.append(openMenu, dropMenu)
    cardHeader.append(nameText,input ,menuWrapper)
    addTask.prepend(span)
    listCardWrapper.append(cardHeader,cardList ,addTask)

    return listCardWrapper
}