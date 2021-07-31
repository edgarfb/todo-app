(function () {
    
let d = document;
let todoNew = d.querySelector('#todo-new');
let todoList = d.querySelector('.todo-list');
let counter = d.querySelector('#counter');
let clearBtn = d.querySelector('.clear');

let all = d.querySelector('.all');
let actives = d.querySelector('.actives');
let completed = d.querySelector('.completed');
all.addEventListener('click', displayAll);
actives.addEventListener('click', displayActive);
completed.addEventListener('click', displayCompleted);
clearBtn.addEventListener('click', clearCompleted);





// Set the current amout of itens
counter.innerHTML=  d.querySelectorAll('.list').length - 1;
// Create new list when the user press enter
todoNew.addEventListener('keyup', function(e) {
    
    if(e.key === 'Enter') {
        createTodo(e.target.value);
        let listas = d.querySelectorAll('.list');
        // reset input fild
        todoNew.value = '';
        // Set the current amout of itens
        counter.innerHTML =  d.querySelectorAll('.list').length - 1;
    }
})

// crear un nuevo elemento y agregarlo a la lista




function createTodo(value) {
    let div = d.createElement('div');
    let li = d.createElement('li');
    let check = createCheck(li, div);
    li.innerHTML = value;
    div.classList.add('list', 'newList');
    div.appendChild(check);
    div.appendChild(li);
    todoList.appendChild(div);
}


// This control check button
// check is the container
// checkIcon is the icon
// To avoid colision between check and checkIcon I created a frontLayer to managed the click event.
function createCheck(toLine, parent) {
    let check = d.createElement('div');
    let checkIcon = createIcon();
    check.appendChild(checkIcon);
    check.appendChild(createFrontLayer(check, checkIcon, toLine, parent));
    check.setAttribute('class', 'check');
    
    return check;
}

function createIcon() {
    let checkIcon = d.createElement('img');
    checkIcon.setAttribute('src', './images/icon-check.svg');
    checkIcon.setAttribute('alt', 'Check Icon');
    checkIcon.classList.add('check-icon');
    return checkIcon;
}

function createFrontLayer(container, icon, toLine, parent) {
    console.log('Parent',parent);
    let frontLayer = d.createElement('div');
    frontLayer.classList.add('front-layer');
    frontLayer.addEventListener('click', function(e) {
        parent.classList.toggle('ischeck');
        container.classList.toggle('checked');
        toLine.classList.toggle('li-line');
        toLine.classList.toggle('isCheck');
        icon.classList.toggle('check-icon-block');
    });
    return frontLayer;
}


function clearCompleted() {
    let lista = d.querySelectorAll('.ischeck');
    lista.forEach(el => el.remove());
    counter.innerHTML =  d.querySelectorAll('.list').length - 1;
}

function displayAll() {
    let all = d.querySelectorAll('.newList');
    console.log(all);
}

function displayActive() {
    let actives = Array.from(d.querySelectorAll('.newList'));
    let activesFilter = actives.filter(el => el.classList.contains('ischeck') === false); 
    let completed = actives.filter(el => el.classList.contains('ischeck'));
    activesFilter.forEach(el => el.classList.remove('hide'));
    completed.forEach(el => el.classList.add('hide'));
    // continue here.... I need to refresh the items counter tought
}


// Working..... 
function displayCompleted() {
    let completed = d.querySelectorAll('.ischeck');
    let notCompleted = d.querySelectorAll('.newList')
    // If a element doen't have a '.ischeck' class it is hide and will only shows the completed ones
    notCompleted.forEach(el => {
        if(el.classList.contains('ischeck') === false) {
            el.classList.add('hide');
        }
    });
    counter.innerHTML =  completed.length;
}




})();