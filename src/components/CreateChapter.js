import { getProjects } from "../utils/localStorage"

export function CreateChapter(item) {
    const card = document.createElement('div')
    card.classList.add('card')

    const lvl = document.createElement('div')
    lvl.classList.add('lvl')

    const titleText = document.createElement('span')
    titleText.id = 'titleNameText'

    const titleInput = document.createElement('input')
    titleInput.id = 'titleNameInput'

    titleInput.placeholder = item.title
    titleText.textContent = item.title 

    titleText.addEventListener('click', () => {
        titleText.style.display = 'none'
        titleInput.style.display = 'inline-block'
        titleInput.value = titleText.textContent
        titleInput.focus()
    })

    titleInput.addEventListener('blur', () => {
        const newValue = titleInput.value.trim()
        if (newValue) {
            titleText.textContent = newValue
                
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
    
        titleText.style.display = 'inline-block'
        titleInput.style.display = 'none'
    })

    titleInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            titleInput.blur()
        }
    })

    card.append(lvl, titleText, titleInput)
    return card
}