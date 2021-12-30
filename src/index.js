/*
    Project goals:
    1. Dynamic todo items that can be created with the DOM
    2. Properties associated with the todos (minimum of title, description, duedate, and priority)
    3. Allow user created sections such as projects to separate the todos
    4. The UI should allow the user to do the following:
        * View all sections/projects
        * View all todos
        * Expand a single todo to see and edit details
        * Delete a todo
    5. Web storage should save the data so that the user doesn't lose everything upon refresh

    >> Flexbox displays sections rows, allowing sections to be displayed as a grid
    >> Flexbox displays section contents as columns with 100% width
    >> Items are colored based on priority (Blue/Low > Green/Medium > Red/Urgent)
    >> Items show a title and due date until expanded, once expanded shows all of the info including edit and delete 
    >> User can add new sections by clicking a position absolute button
    >> Users can add new todos by clicking a button at the bottom of the section

*/

// imports

const todoProto = {
    sections: JSON.parse(localStorage.getItem('todos')) || [],
    defaultArray: this.sections,
    createSection(){
        // Section/Project
        const newObject = Object.create(todoProto);
            newObject.index = todoProto.sections.length; // sets the index for tracking purposes
            newObject.name = `Untitled Section ${newObject.index +1}`; 
            newObject.tasks = [];
            newObject.defaultArray = todoProto.sections;
            newObject.add = function(){ // add a function to create new todo tasks
                const newTodo = Object.create(todoProto); 

                // tracking
                const date = new Date();
                const year = date.getFullYear();
                let day = date.getDate();
                let month = date.getMonth() +1;
                if (date < 10){
                    day = "0" + day;
                }

                if (month < 10){
                    month = "0" + month;
                }
                const fullDate = `${year}-${month}-${day}`;

                newTodo.name = "Untitled Task",
                newTodo.priority = 'blue',
                newTodo.due = fullDate,
                newTodo.complete = false,
                newTodo.defaultArray = newObject.tasks;
                newTodo.index = newObject.tasks.length;

                // customization
                newTodo.changePriority = function(){
                    const priorityList = [
                        'blue',
                        'green',
                        'red'
                    ];
                    let index = 0;
                    for (let i = 0; i < priorityList.length; i++){
                        if (priorityList[i] === newTodo.priority){
                            index = i
                        }
                    }

                    if (index != priorityList.length -1){
                        index ++
                    } else {
                        index = 0
                    }

                    newTodo.priority = priorityList[index];
                    return newTodo.priority;

                }

                newTodo.changeDue = function(){
                    const a = prompt('What due date would you like?');
                    this.due = a;
                }

                newTodo.changeComplete = function(){
                    if (this.complete === false){
                        this.complete = true;
                    } else {
                        this.complete = false;
                    }
                }
                newObject.tasks.push(newTodo);
            }
            newObject.add();
        
            newObject.addItem(newObject);

    },
    addItem(item){
        this.defaultArray.push(item);
    }, 
    removeItem(){
        // remove the item
        this.defaultArray.splice(this.index, 1);

        // update the indexes
        for (let i = 0; i < this.defaultArray.length; i++){
            this.defaultArray[i].index = i;
            if (this.defaultArray[i].name.indexOf('Untitled Section') != -1){
                this.defaultArray[i].name = `Untitled Section ${i+1}`;
            }
        }
    },
    returnSections(){
        return todoProto.sections;
    }
}



function loadDom(){
    container.innerHTML = '';
    for (let i = 0; i < todoProto.sections.length; i++){
        // create the section/project elements
        const newSection = document.createElement('div');
        const sectionTitle = document.createElement('div');
        const sectionTodos = document.createElement('ul');
        const newTodoBtn = document.createElement('button');
        
        // populate the text
        sectionTitle.innerText = todoProto.sections[i].name;
        sectionTitle.setAttribute('contentEditable', "true");
        newTodoBtn.innerText = "todo++";

        // add the section event listeners
        function changeName(elm, obj, type){
            if (elm.textContent != undefined && elm.textContent != ''){
                obj.name = elm.innerText;
                return elm.innerText;
            } else {
                const r = confirm(`Would you like to delete this ${type}?`);
                if (r === true){
                    obj.removeItem()
                    loadDom();
                }
            }
        }

        sectionTitle.addEventListener('focusout', ()=>{
            changeName(sectionTitle, todoProto.sections[i], 'section');
        });

        newTodoBtn.addEventListener('click', ()=>{
            todoProto.sections[i].add();
            loadDom();
        });

        // create the todos and add everything to the DOM
        for (let j = 0; j < todoProto.sections[i].tasks.length; j++){
            function toggleComplete(set="toggle"){
                if (set === "none"){
                    todoProto.sections[i].tasks[j].complete = !todoProto.sections[i].tasks[j].complete;
                }

                todoTitle.classList.add('completed');
                if (todoProto.sections[i].tasks[j].complete === true){
                    todoProto.sections[i].tasks[j].complete = false;
                    todoTitle.classList.remove('completed');
                } else {
                    todoProto.sections[i].tasks[j].complete = true;
                }
            };

            // main todo elements
            const newTodo = document.createElement('li'); // the main container
            const todoTitle = document.createElement('button'); // the main todo title that shows the dropdown menu
            const todoMenu = document.createElement('div'); // the container for the menu content
            const setTitle = document.createElement('div');
            const setPriority = document.createElement('div');
            const setDate = document.createElement('input');
            const setComplete = document.createElement('div');

            // attributes
            todoTitle.setAttribute('style', `color: ${todoProto.sections[i].tasks[j].priority}`);
            toggleComplete("none");

            newTodo.classList.add('dropdown');
            todoTitle.classList.add('link');
            todoMenu.classList.add('dropdown-menu');

            setTitle.setAttribute('contentEditable', "true");
            setDate.setAttribute('type', 'date');
            newTodo.dataset.dropdown = "";
            todoTitle.dataset.dropdownButton = "";
            
            todoTitle.innerText = todoProto.sections[i].tasks[j].name;
            setTitle.innerText = todoProto.sections[i].tasks[j].name;
            setDate.value = todoProto.sections[i].tasks[j].due;
            setPriority.innerText = "Toggle Priority";
            setComplete.innerText = "Toggle Complete";

            // event listeners
            setTitle.addEventListener('focusout', ()=>{
                const newName = changeName(setTitle, todoProto.sections[i].tasks[j], 'todo');
                todoTitle.innerText = '';
                todoTitle.innerText = newName;
            });

            setDate.addEventListener('change', ()=>{
                const date = setDate.value;
                todoProto.sections[i].due = date;
                console.log(todoProto.sections[i].due);
            })

            setPriority.addEventListener('click', ()=>{
                const color = todoProto.sections[i].tasks[j].changePriority();
                todoTitle.setAttribute('style', `color: ${color}`);
            });

            setComplete.addEventListener('click', ()=>{
                toggleComplete();
            });

            // add to the dom
            todoMenu.appendChild(setTitle);
            todoMenu.appendChild(setDate);
            todoMenu.appendChild(setPriority);
            todoMenu.appendChild(setComplete);
            newTodo.appendChild(todoTitle);
            newTodo.appendChild(todoMenu);
            sectionTodos.appendChild(newTodo);
        }

        newSection.appendChild(sectionTitle);
        newSection.appendChild(sectionTodos);
        newSection.appendChild(newTodoBtn);
        container.appendChild(newSection);
    }

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
    };
      
    localStorage.setItem('todos', JSON.stringify(todoProto.sections, getCircularReplacer()));
}

const container = document.querySelector('#container');

const newSection = document.createElement('button');
newSection.innerText = `+`;
newSection.addEventListener('click', ()=>{
    todoProto.createSection();
    loadDom();

});

document.body.appendChild(newSection);

// event listeners for the menus to appear/disappear
document.addEventListener('click', e =>{
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;
    
    let currentDropdown
    if (isDropdownButton){
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown =>{
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
    })
});

// load the dom
loadDom();


//
