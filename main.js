({138:function(){const e={sections:JSON.parse(localStorage.getItem("todos"))||[],defaultArray:this.sections,createSection(){const t=Object.create(e);t.index=e.sections.length,t.name=`Untitled Section ${t.index+1}`,t.tasks=[],t.defaultArray=e.sections,t.add=function(){const n=Object.create(e),o=new Date,s=o.getFullYear();let i=o.getDate(),d=o.getMonth()+1;o<10&&(i="0"+i),d<10&&(d="0"+d);const c=`${s}-${d}-${i}`;n.name="Untitled Task",n.priority="blue",n.due=c,n.complete=!1,n.defaultArray=t.tasks,n.index=t.tasks.length,n.changePriority=function(){const e=["blue","green","red"];let t=0;for(let o=0;o<e.length;o++)e[o]===n.priority&&(t=o);return t!=e.length-1?t++:t=0,n.priority=e[t],n.priority},n.changeDue=function(){const e=prompt("What due date would you like?");this.due=e},n.changeComplete=function(){!1===this.complete?this.complete=!0:this.complete=!1},t.tasks.push(n)},t.add(),t.addItem(t)},addItem(e){this.defaultArray.push(e)},removeItem(){this.defaultArray.splice(this.index,1);for(let e=0;e<this.defaultArray.length;e++)this.defaultArray[e].index=e,-1!=this.defaultArray[e].name.indexOf("Untitled Section")&&(this.defaultArray[e].name=`Untitled Section ${e+1}`)},returnSections:()=>e.sections};function t(){n.innerHTML="";for(let i=0;i<e.sections.length;i++){const d=document.createElement("div"),c=document.createElement("div"),a=document.createElement("ul"),r=document.createElement("button");function o(e,n,o){if(null!=e.textContent&&""!=e.textContent)return n.name=e.innerText,e.innerText;!0===confirm(`Would you like to delete this ${o}?`)&&(n.removeItem(),t())}c.innerText=e.sections[i].name,c.setAttribute("contentEditable","true"),r.innerText="todo++",c.addEventListener("focusout",(()=>{o(c,e.sections[i],"section")})),r.addEventListener("click",(()=>{e.sections[i].add(),t()}));for(let t=0;t<e.sections[i].tasks.length;t++){function s(n="toggle"){"none"===n&&(e.sections[i].tasks[t].complete=!e.sections[i].tasks[t].complete),d.classList.add("completed"),!0===e.sections[i].tasks[t].complete?(e.sections[i].tasks[t].complete=!1,d.classList.remove("completed")):e.sections[i].tasks[t].complete=!0}const n=document.createElement("li"),d=document.createElement("button"),c=document.createElement("div"),r=document.createElement("div"),l=document.createElement("div"),u=document.createElement("input"),m=document.createElement("div");d.setAttribute("style",`color: ${e.sections[i].tasks[t].priority}`),s("none"),n.classList.add("dropdown"),d.classList.add("link"),c.classList.add("dropdown-menu"),r.setAttribute("contentEditable","true"),u.setAttribute("type","date"),n.dataset.dropdown="",d.dataset.dropdownButton="",d.innerText=e.sections[i].tasks[t].name,r.innerText=e.sections[i].tasks[t].name,u.value=e.sections[i].tasks[t].due,l.innerText="Toggle Priority",m.innerText="Toggle Complete",r.addEventListener("focusout",(()=>{const n=o(r,e.sections[i].tasks[t],"todo");d.innerText="",d.innerText=n})),u.addEventListener("change",(()=>{const t=u.value;e.sections[i].due=t,console.log(e.sections[i].due)})),l.addEventListener("click",(()=>{const n=e.sections[i].tasks[t].changePriority();d.setAttribute("style",`color: ${n}`)})),m.addEventListener("click",(()=>{s()})),c.appendChild(r),c.appendChild(u),c.appendChild(l),c.appendChild(m),n.appendChild(d),n.appendChild(c),a.appendChild(n)}d.appendChild(c),d.appendChild(a),d.appendChild(r),n.appendChild(d)}localStorage.setItem("todos",JSON.stringify(e.sections,(()=>{const e=new WeakSet;return(t,n)=>{if("object"==typeof n&&null!==n){if(e.has(n))return;e.add(n)}return n}})()))}const n=document.querySelector("#container"),o=document.createElement("button");o.innerText="+",o.addEventListener("click",(()=>{e.createSection(),t()})),document.body.appendChild(o),document.addEventListener("click",(e=>{const t=e.target.matches("[data-dropdown-button]");if(!t&&null!=e.target.closest("[data-dropdown]"))return;let n;t&&(n=e.target.closest("[data-dropdown]"),n.classList.toggle("active")),document.querySelectorAll("[data-dropdown].active").forEach((e=>{e!==n&&e.classList.remove("active")}))})),t()}})[138]();