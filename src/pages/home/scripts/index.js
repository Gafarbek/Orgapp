import { CardProject } from "../../../components/CardProject";
import { addProjects, getProjects, deleteProject } from "../../../utils/localStorage"
import { Render } from "../../../utils/render";

const textN = document.getElementById('projectNameText')
const inputN = document.getElementById('projectNameInput')
const tabBackground = document.querySelector('.tabBackground')
const tabContent = document.querySelector('.tabContent')
const form = document.getElementById('createPrject')
const allProj = document.querySelector('.allProjects')

const buttonPlus = document.querySelector('.plusB')
const buttonNewProject = document.querySelector('.newProject')

buttonNewProject.addEventListener('click', () => {
    tabBackground.classList.remove('hidden')
})

buttonPlus.addEventListener('click', () => {
    tabBackground.classList.remove('hidden')
})

tabBackground.addEventListener('click', () => {
    tabBackground.classList.add('hidden')
})

tabContent.addEventListener('click', (e) => {
    e.stopPropagation()
})

textN.addEventListener('click', () => {
    textN.style.display = 'none'
    inputN.style.display = 'inline-block'
    inputN.focus()
})

inputN.addEventListener('blur', () => {
    const newValue = inputN.value.trim()
    if (newValue) {
        textN.textContent = newValue
    }

    textN.style.display = 'inline-block'
    inputN.style.display = 'none'
})

inputN.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        inputN.blur()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = inputN.value.trim()
    if(!name) return

    const project = {
        id: Date.now().toString(),
        name,
    }

    addProjects(project)
    inputN.value = ''

    tabBackground.classList.add('hidden')
    renderAllProject()
})

function renderAllProject() {
    allProj.innerHTML = ''

    const projects = getProjects()
    Render(projects, allProj, (item) => CardProject(item, (projectId) => {
        deleteProject(projectId)
        renderAllProject()
    }))
}

renderAllProject()