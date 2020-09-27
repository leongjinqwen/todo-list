let userInput = document.getElementById('todo-input')
let container = document.querySelector('#container')
let todos;

userInput.addEventListener('keypress',function(e){
    if  (userInput.value !== '' && e.key === 'Enter'){
        todos = JSON.parse(localStorage.getItem('myList'))
        let newList = [...todos, {
            task: userInput.value,
            done: false //default status
        }]
        localStorage.setItem('myList', JSON.stringify(newList))
        userInput.value = ''
        renderToDo()
    }
})
const renderToDo = () => {
    todos = localStorage.getItem('myList') ? JSON.parse(localStorage.getItem('myList')) : localStorage.setItem('myList', JSON.stringify([]))
    container.innerHTML = ''
    for (let i = 0; i < todos.length; i++) {
        let newTask = document.createElement('div')
        newTask.classList.add('panel-block')
        newTask.innerHTML = todos[i].done 
        ? `<div class="done">${todos[i].task}</div>
            <div>
                <button onclick=markDone(${i}) class="button is-rounded is-small is-info">Undone</button>
                <button onclick=deleteTask(${i}) class="button is-rounded is-small is-danger">Delete</button>
            </div>` 
        : `<div>${todos[i].task}</div>
            <div>
                <button onclick=markDone(${i}) class="button is-rounded is-small is-success">Done</button>
                <button onclick=deleteTask(${i}) class="button is-rounded is-small is-danger">Delete</button>
            </div>`
        container.appendChild(newTask)
    }
}
const markDone = (idx) => {
    let newList = todos.map((todo,index)=> index == idx ? {...todo, done: !todo.done} : todo)
    localStorage.setItem('myList', JSON.stringify(newList))
    renderToDo()
}
const deleteTask = (idx) => {
    let newList = todos.filter((todo,index)=> index!=idx )
    localStorage.setItem('myList', JSON.stringify(newList))
    renderToDo()
}
renderToDo()
