// allows nodes to be added/removed/moved around the DOM

/*

    const section = {
        name: "untitled",
        tasks: [1, 2, 3],  
    }

    `<div class="section">
        <div class="section-title">test</div>
        <ul class="section-tasks">
            <li><label><input type="checkbox"><span class="section-tasks-text">1</span></label></li>
            <li><label><input type="checkbox"><span class="section-tasks-text">2</span></label></li>
            <li><label><input type="checkbox"><span class="section-tasks-text">3</span></label></li>
        </ul>
        <button class="circle-btn" style="background: black">+</button>
    </div>`;

*/

const dom = {
    create: function(obj){
        // important consts
        const index = obj.index;
        const child = document.createElement('div');
        const elmTitle = document.createElement('div');
        const tasks = document.createElement('ul');
        const btn = document.createElement('button');
        
        child.setAttribute('id', `container-${index}`);
        child.classList.add('section');

         // title for the section
         elmTitle.classList.add('section-title');
         elmTitle.innerText = obj.name;
         elmTitle.setAttribute("id", `title-${index}`)
         elmTitle.setAttribute("contenteditable", `true`);
         child.appendChild(elmTitle);
 
         // task(s) w/ drop-downs
         tasks.classList.add("section-items");
         tasks.setAttribute('id', `tasks-${index}`);
         for (let i = 0; i < obj.tasks.length; i++){
             tasks.innerHTML += `<li class="dropdown">
                                <input class="section-items-check" type="checkbox">
                                <button class="section-items-text">${obj.tasks[i]}</button>
                                <div class="dropdown-menu">test</div></li>`;
         };
         child.appendChild(tasks);
 
         // "add new" button
         btn.innerText = "+";
         btn.classList.add("circle-btn");
         btn.setAttribute("style", "background: black");
         child.appendChild(btn);

         // add event listeners
         elmTitle.addEventListener('focusout', ()=>{
             const title = document.getElementById(`title-${index}`);
             obj.name = title.innerText;

             if (title.innerHTML == "" || title.innerHTML == "<br>"){
                const a = confirm("Would you like to delete this section?");
                if (a === true){
                    const elm = document.getElementById(`container-${index}`);
                    elm.remove();
                }
            }

             // obj.updateStorage(); -- doesn't work currently
         });

         btn.addEventListener('click', ()=>{
            const taskElm = document.getElementById(`tasks-${index}`);
            const taskName = prompt("What task would you like to add?");
            const newTask = document.createElement('li');
            newTask.innerHTML = `<label><input type="checkbox" class="section-items-check"><span class="section-items-text">${taskName}</span></label>`;

            obj.tasks.push(taskName);
            dom.add(newTask, taskElm);
         });

         
 
        return child;
    },

    populate: function(array, parent){
        for (let i = 0; i < array.length; i ++){
            dom.add(dom.create(array[i]), parent);
        }
    },

    remove: function(child){
        child.remove();
    },

    add: function(child, parent){
        parent.appendChild(child);   
    },
};

export {dom as default};
