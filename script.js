// save each todo item as an object that have two keys, 
// task's description and task's status (whether the task done or not)
// the todolist should be an array of objects
let todoList = []

// render the todolist in container
let container = document.querySelector('#container')

const renderTodos = () => {
    // code will break if can't find any item with key todos in localStorage
    // so need to set the key with empty array if key not found
    if ( !JSON.parse(localStorage.getItem('todos')) ) {
        localStorage.setItem('todos', JSON.stringify([]))
    }
    // get todolist from localStorage 
    todoList = JSON.parse(localStorage.getItem('todos'))
    container.innerHTML = '' // clear the container before render newlist
    for(let i =0; i<todoList.length; i++){  // loop throught the list
        // create new element for each item
        let newItem = document.createElement('div')
        newItem.classList.add('panel-block')
        // add mark done and delete button in newItem 
        // render depend on the todo item status
        newItem.innerHTML = todoList[i].status ? // if status is true
            `
                <div class="done">${todoList[i].task}</div>
                <div>
                    <button class="button is-small is-rounded is-primary" onclick=markDone(${i}) >Undone</button>
                    <button class="button is-small is-rounded is-danger" onclick=deleteTask(${i})>Delete</button>
                </div>
            `
            :
            `
                <div>${todoList[i].task}</div>
                <div>
                    <button class="button is-small is-rounded is-info" onclick=markDone(${i}) >Done</button>
                    <button class="button is-small is-rounded is-danger" onclick=deleteTask(${i})>Delete</button>
                </div>
            `
        container.appendChild(newItem)
    }
}
renderTodos()

// when done button clicked, change the todo item status to true
const markDone = (idx) => {
    // pass in index number in array to identify the item
    let updatedList = todoList.map((todo, index) =>{
        if (idx === index){
            return  {
                ...todo, //clone the item
                status: !todo.status // flip the original status
            }
        }
        return todo
    })
    localStorage.setItem('todos', JSON.stringify(updatedList))
    renderTodos()
}

// remove from list when delete button onclick
const deleteTask = (idx) => {
    let deletedList = todoList.filter((todo,index) => index !== idx) // only return if index not equal to idx
    localStorage.setItem('todos', JSON.stringify(deletedList))
    renderTodos() // render the whole list again
}

// create new todo item when user press enter in input field
let userInput = document.querySelector('#task-input')

userInput.addEventListener('keypress', function(e){
    // if user press enter and userinput value is not empty, then create new item
    if (userInput.value !== '' && e.key === 'Enter') {
        let newList = [
            ...todoList, // clone the original list
            // add new task object
            {
                task: userInput.value,
                status: false //default set as false
            }
        ]
        localStorage.setItem('todos', JSON.stringify(newList)) // set item in localStorage
        userInput.value = '' // clear the input after getting the value
        renderTodos() // render the whole list again
    }
})
