import { CreateChapter } from "../../../components/CreateChapter";
import { CreateProject } from "../../../components/CreateProject";
import { deleteList, getProjects, saveProject } from "../../../utils/localStorage";
import { Render } from "../../../utils/render";

const buttonNewSection = document.querySelector('.createNewSection')
const lists = document.getElementById('lists')
const app = document.querySelector('.allLIsts')

const originalVersion = {
    ListTitle: 'List title'
}

buttonNewSection.addEventListener('click', () => {
    const newCard = {
        id: Date.now().toString(),
        title: originalVersion.ListTitle,
        section: []
    }
    
    const projects = getProjects()
    const currentId = localStorage.getItem('currentProjectId')
    const project = projects.find(p => p.id === currentId)
    
    if(!project) {
        alert('Проект не найден')
        return
    }

    if(!project.lists) project.lists = []
    project.lists.push(newCard)
    saveProject(projects)

    const newElement = CreateProject(newCard, (listId) => {
        deleteList(listId)
        loadProject()
    })

    lists.insertBefore(newElement, buttonNewSection)
})

function loadProject() {
    const id = localStorage.getItem('currentProjectId')
    const project = getProjects().find((p) => p.id === id)
    
    if(!project) {
        document.getElementById('app').innerHTML = 'Проект не найден'
        return
    }

    if(projectName) {
        projectName.textContent = project.name
    }

    lists.innerHTML = ''
    lists.append(buttonNewSection)
    
    if(project.lists && project.lists.length > 0) {
        const tempContainer = document.createDocumentFragment()

        Render(project.lists, tempContainer, (item) => 
            CreateProject(item, (listId) => {
                deleteList(listId)
                loadProject()
            })
        )
        lists.insertBefore(tempContainer, buttonNewSection)
    }
}

loadProject()

app.addEventListener('click', (e) => {
    document.querySelectorAll('.dropMenu').forEach(menu => {
        if(!menu.contains(e.target) && !e.target.classList.contains('openMenu')) {
            menu.classList.add('hidden')
        }
    })
})

const originalTitle = {
    title: 'Gafar'
}

document.querySelectorAll('.addTask').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const card = document.querySelectorAll('.cardList')[index]
        Render(originalTitle, card, CreateChapter)
    })
}) 