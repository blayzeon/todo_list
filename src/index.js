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
    sections: [],
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
                newTodo.name = "Untitled Task",
                newTodo.priority = "Low",
                newTodo.due = "Tomorrow",
                newTodo.complete = false,
                newTodo.defaultArray = newObject.tasks;
                newTodo.index = newObject.tasks.length;

                // customization
                newTodo.changePriority = function(){
                    const a = prompt('What priority would you like?');
                    this.priority = a;
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
    changeName(name){
        this.defaultArray[index].name = name;
    },
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
            const a = elm.textContent;
            if (a != undefined && a != ''){
                obj.name = a;
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
            const newTodo = document.createElement('li');
            newTodo.innerText = todoProto.sections[i].tasks[j].name;
            newTodo.setAttribute('contentEditable', "true");

            // event listener
            newTodo.addEventListener('focusout', ()=>{
                changeName(newTodo, todoProto.sections[i].tasks[j], 'todo');
            });
            sectionTodos.appendChild(newTodo);
        }

        newSection.appendChild(sectionTitle);
        newSection.appendChild(sectionTodos);
        newSection.appendChild(newTodoBtn);
        container.appendChild(newSection);
    }
}

const container = document.querySelector('#container');

const newSection = document.createElement('button');
newSection.innerText = `+`;
newSection.addEventListener('click', ()=>{
    todoProto.createSection();
    loadDom();

});

document.body.appendChild(newSection);



// test


//
