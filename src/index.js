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
import dom from './manipulate_dom';

// main consts
let sections = JSON.parse(localStorage.getItem('sections')) || [new Section(0, "Todo")];
const container = document.querySelector('#container');
const sectionBtn = document.createElement('button');

function Section(index, name="untitled"){
    this.name = name;
    this.tasks = [];
    this.index = index;
    this.delete = function(){
        sections.splice(this.index, 1);
    };

    this.updateStorage = function(){
        localStorage.setItem('sections', JSON.stringify(sections));
    };
}

// add new section button
sectionBtn.innerHTML = "+";
sectionBtn.classList.add("circle-btn");
sectionBtn.setAttribute('id', 'ui-add-btn');
container.appendChild(sectionBtn);

sectionBtn.addEventListener('click', ()=>{
    // create a new section and add it to the sections array
    const index = sections.length;

    sections.push(new Section(index));

    // update the local storage
    sections[index].updateStorage();

    // populate the dom
    dom.add(dom.create(sections[index]), container);

    console.log(sections);
});

dom.populate(sections, container);

// test


//
