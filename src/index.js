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
function formatJson(){
    let result = [];
    const storage = JSON.parse(localStorage.getItem('todos')) || [];
    if (storage.length > 0){
        for (let i = 0; i < storage.length; i++){
            result.push(Object.setPrototypeOf(storage[i], todoProto));
        }
    }
    return result;
};

const todoProto = {
    sections: storage = JSON.parse(localStorage.getItem('todos')) || [],
    defaultArray: this.sections,
    createSection(){
        // Section/Project
        const newObject = Object.create(todoProto);
            const index = todoProto.sections.length
            newObject.index = index; // sets the index for tracking purposes
            newObject.name = `Untitled Section ${index +1}`; 
            newObject.tasks = [];
            newObject.defaultArray = newObject.tasks;
            todoProto.sections.push(newObject);
            newObject.addItem(index);

    },
    addItem(objIndex){
        const newObject = todoProto.sections[objIndex];
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

        newObject.tasks.push(newTodo);
    }, 

    removeItem(obj, spliceArray=todoProto.sections){
        // remove the item
        spliceArray.splice(obj.index, 1);

        // update the indexes
        for (let i = 0; i < spliceArray.length; i++){
            spliceArray.index = i;
            if (spliceArray[i].name.indexOf('Untitled Section') != -1){
                spliceArray[i].name = `Untitled Section ${i+1}`;
            }
        }
    },

    changePriority(newTodo){
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

    },

    saveChanges(){
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
}

todoProto.sections = formatJson();

function loadDom(){
    todoProto.saveChanges();
    container.innerHTML = '';
    for (let i = 0; i < todoProto.sections.length; i++){

        // create the section/project elements
        const newSection = document.createElement('div');
        newSection.classList.add('section');
        const sectionTitle = document.createElement('div');
        sectionTitle.classList.add('section-title')
        const sectionTodos = document.createElement('ul');
        sectionTodos.classList.add('section-items');
        const newTodoBtn = document.createElement('button');
        newTodoBtn.classList.add('circle-btn')
        
        // populate the text
        sectionTitle.innerText = todoProto.sections[i].name;
        sectionTitle.setAttribute('contentEditable', "true");
        newTodoBtn.innerText = "...";

        // add the section event listeners
        function changeName(elm, obj, type, defaultArray=todoProto.sections){
            if (elm.textContent != undefined && elm.textContent != ''){
                obj.name = elm.innerText;
                todoProto.saveChanges();
                return elm.innerText;
            } else {
                const r = confirm(`Would you like to delete this ${type}?`);
                if (r === true){
                    obj.removeItem(obj, defaultArray);
                    loadDom();
                }
            }
        }

        sectionTitle.addEventListener('focusout', ()=>{
            changeName(sectionTitle, todoProto.sections[i], 'section');
        });

        newTodoBtn.addEventListener('click', ()=>{
            todoProto.sections[i].addItem(i);
            loadDom();
        });

        // create the todos and add everything to the DOM
        for (let j = 0; j < todoProto.sections[i].tasks.length; j++){
            //Object.setPrototypeOf(todoProto.sections[i].tasks[j], todoProto);
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
                todoProto.saveChanges();
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
                const newName = changeName(setTitle, todoProto.sections[i].tasks[j], 'todo', todoProto.sections[i].tasks);
                todoTitle.innerText = '';
                todoTitle.innerText = newName;
            });

            setDate.addEventListener('change', ()=>{
                const date = setDate.value;
                todoProto.sections[i].tasks[j].due = date;

                todoProto.saveChanges();
            })

            setPriority.addEventListener('click', ()=>{
                const color = todoProto.changePriority(todoProto.sections[i].tasks[j]);
                todoTitle.setAttribute('style', `color: ${color}`);

                todoProto.saveChanges();
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
}

const container = document.querySelector('#container');

const newSectionBtn = document.createElement('button');
newSectionBtn.classList.add('circle-btn');
newSectionBtn.setAttribute('id', 'ui-add-btn');
newSectionBtn.innerText = `+`;
newSectionBtn.addEventListener('click', ()=>{
    todoProto.createSection();
    loadDom();

});

document.body.appendChild(newSectionBtn);

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
