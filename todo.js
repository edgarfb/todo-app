
// I use a self-invoked function to avoid namespace collisions

(function () {
    
let d = document;
let todoNew = d.querySelector('#todo-new');
let todoList = d.querySelector('.todo-list');
let counter = d.querySelector('#counter');
let clearBtn = d.querySelector('.clear');


let all = d.querySelectorAll('.all');
let actives = d.querySelectorAll('.actives');
let completed = d.querySelectorAll('.completed');
all.forEach(el => el.addEventListener('click', displayAll));
actives.forEach(el => el.addEventListener('click', displayActive));
completed.forEach(el => el.addEventListener('click', displayCompleted));
clearBtn.addEventListener('click', clearCompleted);
// clearBtn.addEventListener('click', updateCompleted);


// Switcher themes
let htmlDoc = d.querySelector('html');
let switchTheme = d.querySelector('.front-layer-switcher');
let sun = d.querySelector('.switch-theme-sun');
let moon = d.querySelector('.switch-theme-moon');
switchTheme.addEventListener('click', changeThemeDark);

function changeThemeDark() {
    htmlDoc.classList.toggle('light-theme');
    moon.classList.toggle('show');
    sun.classList.toggle('hide');
}



// Set the current amout of itens
counter.innerHTML=  d.querySelectorAll('.list').length - 1;
// Create new list when the user press enter
todoNew.addEventListener('keyup', function(e) {
    let target = e.target.value;
    if(e.key === 'Enter') {
        // Empty value will be not create
        if(target) {
            target = capitalizer(target);
            createTodo(target);
            let listas = d.querySelectorAll('.list');
            // reset input fild
            todoNew.value = '';
            // Set the current amout of itens
            counter.innerHTML =  d.querySelectorAll('.list').length - 1;
        }
        
    }
})

// The first letter will be always capitalized
function capitalizer(str) {
    return str.replace(str[0], str[0].toUpperCase());;
}

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

// manages the behavior of the icon check and it container
function createFrontLayer(container, icon, toLine, parent) {
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
    
    if(lista.length > 0) {
        lista.forEach(el => el.remove());
        updateCompleted();
    }
    
}

function updateCompleted() {
    let all = d.querySelectorAll('.newList');
    counter.innerHTML = all.length;
}

function displayAll() {
    let all = d.querySelectorAll('.newList');
    all.forEach(el => {
        if(el.classList.contains('hide')) {
            el.classList.remove('hide');
        }
    });
    counter.innerHTML = all.length;
}

function displayActive() {
    let actives = Array.from(d.querySelectorAll('.newList'));
    let activesFilter = actives.filter(el => el.classList.contains('ischeck') === false); 
    let completed = actives.filter(el => el.classList.contains('ischeck'));
    activesFilter.forEach(el => el.classList.remove('hide'));
    completed.forEach(el => el.classList.add('hide'));
    counter.innerHTML = activesFilter.length;
}


// Working..... 
function displayCompleted() {
    let completed = d.querySelectorAll('.ischeck');
    let notCompleted = d.querySelectorAll('.newList')
    completed.forEach(el => {
        if(el.classList.contains('hide')) {
            el.classList.remove('hide');
        }
    })
    // If a element doen't have a '.ischeck' class it is hide and will only shows the completed ones
    notCompleted.forEach(el => {
        if(el.classList.contains('ischeck') === false) {
            el.classList.add('hide');
        }
    });
    counter.innerHTML =  completed.length;
}

})();