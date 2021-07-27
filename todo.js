console.log('hi there');
let d = document;
let todoNew = d.querySelector('#todo-new');
let todoList = d.querySelector('.todo-list');
let counter = d.querySelector('#counter');



// Set the current amout of itens
counter.innerHTML=  d.querySelectorAll('.list').length - 1;

todoNew.addEventListener('keyup', function(e) {
    
    if(e.key === 'Enter') {
        createTodo(e.target.value);
        let listas = d.querySelectorAll('.list');
        // reset input fild
        todoNew.value = '';
        // Set the current amout of itens
        counter.innerHTML=  d.querySelectorAll('.list').length - 1;
    }
    // continue here-- works
})

// crear un nuevo elemento y agregarlo a la lista




function createTodo(value) {
    let div = d.createElement('div');
    
    
    let li = d.createElement('li');
    let check = createCheck(li);
    
    let close = d.createElement('div');
    close.setAttribute('class', 'cross');
    close.setAttribute('id', 'cross');
    li.innerHTML = value;
    div.className = 'list';
    div.appendChild(check);
    div.appendChild(li);
    div.appendChild(close);
    todoList.appendChild(div);
}


// This control check button
// check is the container
// checkIcon is the icon
// To avoid colision between check and checkIcon I created a frontLayer to managed the click event.
function createCheck(toLine) {
    let check = d.createElement('div');
    let frontLayer = d.createElement('div');
    frontLayer.setAttribute('class', 'front-layer');
    let checkIcon = d.createElement('img');

    // No funciona como esperaba, ya que no distingue correctamente el lugar donde se hace click.
    checkIcon.setAttribute('src', './images/icon-check.svg');
    checkIcon.setAttribute('alt', 'Check Icon');
    checkIcon.classList.add('check-icon');
    check.appendChild(checkIcon);
    check.appendChild(frontLayer);
    check.setAttribute('class', 'check');
    frontLayer.addEventListener('click', function(e) {
        check.classList.toggle('checked');
        toLine.classList.toggle('li-line');
        checkIcon.classList.toggle('check-icon-block');
    });
    return check;
}

// Todo list events
