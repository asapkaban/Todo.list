// Снятие кнопок 
let task = document.querySelector('.valueInput');
console.log(task.value);
let buttonAdd = document.querySelector('.valueButton');
let divOfTasks = document.querySelector('.content_tasks')
let taskLine = document.querySelector('.tasks_level');
let doneTaskLine = document.querySelector('.tasks_level_done');
let arreaForLine = document.querySelector('.level_done_value');
let clearButton = document.querySelector('.button_clear');
let photoClear = document.querySelector('.img_clear');

// Создание переменных для создания кнопок 
let blockForTask
let buttonTask
let inputTask
let textTask
let doneTaskes = 0;
let allTaskes = 0;

// Прослушка 
document.addEventListener('keypress', function chekEnter(e){
    if (e.key === 'Enter') {
        createTask()
    }
})

buttonAdd.addEventListener('click', createTask);



// Функция для удаления таски 
function deleteTask() {
    let parentTask = this.closest('.task');
    divOfTasks.removeChild(parentTask)
    allTaskes--;
    if (parentTask.classList.contains('task_completed')) {
        doneTaskes--;
    }
    chekDone()
}
// Функция для изминения таски при выполнения задания 
function checked() {
    let parentTask = this.closest('.task'); // Отримати батьківський елемент (таску)
    let textTask = parentTask.querySelector('h2'); // Знайти елемент тексту таски
    if (this.checked) {
        parentTask.classList.add('task_completed');
        textTask.classList.add('task_completed_h2');
        doneTaskes++;
        chekDone()
    } else {
        parentTask.classList.remove('task_completed');
        textTask.classList.remove('task_completed_h2');
        doneTaskes--;
        chekDone()
    }
}
// функция создания таски 
function createTask() {
    if (!task.value) {
        task.placeholder = "Ви не ввели значення!"
    }
    else {
        task.placeholder = "Введіть завдання"
        blockForTask = document.createElement('div');
        blockForTask.classList.add('task');
        divOfTasks.append(blockForTask);
        inputTask = document.createElement('input');
        inputTask.type = 'checkbox';
        inputTask.classList.add('task_input');
        blockForTask.append(inputTask);
        textTask = document.createElement('h2');
        textTask.textContent = `${task.value}`
        blockForTask.append(textTask);
        buttonTask = document.createElement('button');
        buttonTask.textContent = 'X';
        blockForTask.append(buttonTask);
        task.value = '';
        inputTask.addEventListener('click', checked);
        buttonTask.addEventListener('click', deleteTask)
        allTaskes++;
        chekDone()
    }
}
// Функция ползунок сколько заданий выполнено 
function chekDone() {
    let allvalue = Number(taskLine.clientWidth);
    let widthOfDone = (allvalue / allTaskes) * doneTaskes;
    doneTaskLine.style.width = `${widthOfDone}px`
    arreaForLine.textContent = `Виконано ${doneTaskes}/${allTaskes}`
    if (allTaskes == 0) {
        doneTaskLine.style.width = ''
    }
}
// Функция на кнопку очистки 

clearButton.addEventListener('mouseover', function hoverButtonClear() {
    photoClear.src = './img/icons8-erase-64 (1).png'
    clearButton.style.backgroundColor = 'rgb(80, 141, 202)';
})
clearButton.addEventListener('mouseout', function hoverButtonClear() {
    photoClear.src = './img/icons8-erase-64.png'
    clearButton.style.backgroundColor = 'aliceblue';
})
clearButton.addEventListener('click', function clearDone() {
    let i = 0;
    while (i < divOfTasks.children.length) {
        let elem = divOfTasks.children[i];
        if (elem.classList.contains('task_completed')) {
            elem.remove();
            doneTaskes--;
            allTaskes--;
            chekDone()
        } else {
            i++;
        }
    }
})