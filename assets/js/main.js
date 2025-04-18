const taskTitleInput = document.querySelector("#task-title");
const taskDetailsInput = document.querySelector("#task-details");
const taskAddedButton = document.querySelector("form button");

const outputArea= document.querySelector(".todo-output");

let title, details;



taskTitleInput.addEventListener("input", (e) => {
	if(e.target.value) {
		title = e.target.value;
	}
});

taskDetailsInput.addEventListener("input", (e) => {
	if(e.target.value) {
		details = e.target.value;
	}
});	


taskAddedButton.addEventListener("click", (e) => {
	let uniqueId = Date.now().toString();
	let uniqueId2 = Date.now().toString() + 1;
	
	if(title && details) {
		e.preventDefault();
		
		createTaskItem(title, details, uniqueId, uniqueId2);
		
		let todos = getTodosFromLocalStorage();
		todos.push({id: uniqueId, id2: uniqueId2, title, details});
		localStorage.setItem("Todos", JSON.stringify(todos));
		
		taskTitleInput.value = "";
		title = "";
		taskDetailsInput.value = "";
		details = "";
	}
	
	let deleteButtons = document.querySelectorAll(".delete");
	deleteButtons.forEach((button) => {
		if(button.id === uniqueId) {
			button.addEventListener("click", () => {
				deleteTaskItem(button);
			});
		}
	});
	
	let editButtons = document.querySelectorAll(".edit");
	editButtons.forEach((button) => {
		if(button.id === uniqueId2) {
			button.addEventListener("click", () => {
				editTaskItem(button);
			});
		}
	});
	
});


window.addEventListener("DOMContentLoaded", () => {
	let todos = getTodosFromLocalStorage();
	todos.map(todo => {
		createTaskItem(todo.title, todo.details, todo.id, todo.id2);
	});
});



const createTaskItem = (title, details, deleteId, editID) => { 
	let taskItem = document.createElement("div");
	taskItem.classList.add("task-item");
	
	taskItem.innerHTML = `
		<div class="row">
			<div class="col-7" id="left">
				<h2> ${title} </h2>
				<p> ${details} </p>
			</div>
			<div class="col-5" id="right">
				<button class="edit" id="${editID}"> <i class="fas fa-edit"></i> </button>
				<button class="delete" id="${deleteId}"> <i class="fas fa-trash"></i> </button>
			</div>
		</div>
	`;
	
	outputArea.appendChild(taskItem);
};


const editTaskItem = (button) => {
	let h2 = button.parentElement.parentElement.children[0].children[0];
	let p = button.parentElement.parentElement.children[0].children[1];
	
	let changedTitle = prompt("Write Changed Task Title");
	let changedDetails = prompt("Write Changed Task Details");
	
	let todos = getTodosFromLocalStorage();
	
	let changedTodoIndex = todos.findIndex(todo => {
		return todo.id2 === button.id;
	});
	
	if(changedTitle === "" && changedDetails === "") {
		alert("Task Title and Task Details Must be Entered");
	} else if(changedTitle === "") {
		alert("Task Title Must be Entered");
	} else if(changedDetails === "") {
		alert("Task Details Must be Entered");
	} else {
		h2.innerText = changedTitle;
		todos[changedTodoIndex].title = changedTitle;
		p.innerText = changedDetails;
		todos[changedTodoIndex].details = changedDetails;
	}
	
	localStorage.setItem("Todos", JSON.stringify(todos));
};

const deleteTaskItem = (button) => {
	let item = button.parentElement.parentElement.parentElement;
	outputArea.removeChild(item);
	
	let todos = getTodosFromLocalStorage();
	todos = todos.filter(todo => {
		return todo.id !== button.id;
	});
	localStorage.setItem("Todos", JSON.stringify(todos));
	
};


const getTodosFromLocalStorage = () => {
	return localStorage.getItem("Todos") ? JSON.parse(localStorage.getItem("Todos")) : [];
};
