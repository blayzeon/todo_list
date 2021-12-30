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
            newObject.name = `Untitled Section ${newObject.index}`; 
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
    removeItem(index){
        // remove the item
        this.defaultArray.splice(index, 1);

        // update the indexes
        for (let i = 0; i < this.defaultArray.length; i++){
            this.defaultArray[i].index = i;
        }
    },
    changeName(name, index){
        this.defaultArray[index].name = name;
    },
}

function createDom(){
    container.innerHTML = '';
    for (let i = 0; i < todoProto.sections.length; i++){
        let taskList = ``;
        // grab the tasks to add in later
        for (let j = 0; j < todoProto.sections[i].tasks.length; j++){
            taskList += `<li>${todoProto.sections[i].tasks[j].name}</li>`
        }

        // create the section/project
        const newDiv = document.createElement('div');
        const todoGuts = document.createElement('div');
        todoGuts.innerHTML = `<h3>${todoProto.sections[i].name}</h3><ul>${taskList}</ul>`;
        
        // create a button to add more todos
        const todoBtn = document.createElement('button');
        todoBtn.innerText = "add task";
        todoBtn.addEventListener('click', ()=>{
            todoProto.sections[i].add();
            createDom();
        });

        // add to the DOM
        newDiv.appendChild(todoGuts);
        newDiv.appendChild(todoBtn);
        container.appendChild(newDiv);
    }
}

const container = document.querySelector('#container');

const newSection = document.createElement('button');
newSection.innerText = `+`;
newSection.addEventListener('click', ()=>{
    todoProto.createSection();
    createDom();

});

document.body.appendChild(newSection);



// test


//
