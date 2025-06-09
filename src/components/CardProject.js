export function CardProject(item, onDelete) {
    const card = document.createElement('div')
    card.classList.add('projectCard')

    const nameElement = document.createElement('span')
    nameElement.textContent = item.name
    
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.textContent = '×'
    
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation()
        if (confirm(`Вы уверены, что хотите удалить проект ${item.name}?`)) {
            onDelete(item.id)
        }
    })

    
    card.append(nameElement, deleteButton)
    
    card.addEventListener('click', () => {
        localStorage.setItem('currentProjectId', item.id)
        window.location.href = '/allLists'
    })
    
    return card
}