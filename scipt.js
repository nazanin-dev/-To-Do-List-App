const inpEnter = document.querySelector('#enter');
const btnAdd = document.querySelector('#add');
const list = document.querySelector("#list");
const clearAll = document.querySelector('#clear');
const allBtn = document.querySelector('#All');
const activeBtn = document.querySelector('#act');
const completedBtn = document.querySelector('#com');
const actBtn = document.querySelectorAll('.active-btn');


document.addEventListener("DOMContentLoaded", loadTodos);
btnAdd.addEventListener('click', addto);
list.addEventListener('click', funcontask);
clearAll.addEventListener('click', clearingall);
allBtn.addEventListener('click', showAll);
activeBtn.addEventListener('click', showActive);
completedBtn.addEventListener('click', showCompleted);



let editingTask = null;
let previousTask = '';

function addto() {
    if (inpEnter.value.trim() === '') {
        alert("Please enter your task!");
        return;
    }
    
    if (editingTask) {
        const newTask = inpEnter.value;
        updateLocalStorage(previousTask, newTask);
        editingTask.innerText = newTask;
        editingTask = null;
        previousTask = '';
    } else {
        const taskText = inpEnter.value;
        addTaskToDOM(taskText, false);
        saveToLocalStorage(taskText, false);
    }
    
    inpEnter.value = '';
}

inpEnter.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        addto(); 
    }
});

function addTaskToDOM(taskText, isCompleted) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('toDoDiv');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        toDoDiv.classList.toggle('completed', checkbox.checked);
        updateTaskCompletion(taskText, checkbox.checked);
    });
    toDoDiv.appendChild(checkbox);
    
    const newTask = document.createElement('li');
    newTask.innerText = taskText;
    newTask.classList.add('task');
    toDoDiv.appendChild(newTask);
    
    if (isCompleted) {
        toDoDiv.classList.add('completed');
    }
    
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    editBtn.classList.add('edit');
    toDoDiv.appendChild(editBtn);
    
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<span class="material-icons">delete</span>';
    delBtn.classList.add('trash');
    toDoDiv.appendChild(delBtn);
    
    list.appendChild(toDoDiv);
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => addTaskToDOM(todo.text, todo.completed));
}

function saveToLocalStorage(todo, completed) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text: todo, completed: completed });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTaskCompletion(taskText, isCompleted) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(todo => todo.text === taskText ? { text: todo.text, completed: isCompleted } : todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function funcontask(event) {
    const item = event.target;
    const button = item.closest('button');

    if (!button) return;

    const todoDiv = button.closest('.toDoDiv');
    if (!todoDiv) return;

    if (button.classList.contains('trash')) {
        const task = todoDiv.querySelector('.task').innerText;
        removeFromLocalStorage(task);
        todoDiv.remove();
    }

    if (button.classList.contains('edit')) {
        const task = todoDiv.querySelector('.task');
        inpEnter.value = task.innerText;
        previousTask = task.innerText;
        editingTask = task;
    }
}

function clearingall() {
    localStorage.clear();
    list.innerHTML = '';
}

function updateLocalStorage(oldTask, newTask) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(todo => todo.text === oldTask ? { text: newTask, completed: todo.completed } : todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocalStorage(task) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.text !== task);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAll() {
    document.querySelectorAll('.toDoDiv').forEach(div => div.style.display = 'flex');
}

function showActive() {
    document.querySelectorAll('.toDoDiv').forEach(div => {
        const isCompleted = div.classList.contains('completed');
        div.style.display = isCompleted ? 'none' : 'flex';
    });
}

function showCompleted() {
    document.querySelectorAll('.toDoDiv').forEach(div => {
        const isCompleted = div.classList.contains('completed');
        div.style.display = isCompleted ? 'flex' : 'none';
    });
}




actBtn.forEach(button => {
    button.addEventListener('click', function () {
        console.log('1click');
        
       
        actBtn.forEach(btn => btn.classList.remove('activing'));
        console.log('2click');

        
        button.classList.add('activing');
        console.log('1click');
    })
    })
