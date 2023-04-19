import moment from 'moment';
import { projectStorage } from '../index.js';
import {
  createProjectBtnListeners,
  createToDoBtnListeners,
} from './listeners.js';
import { activeProject } from './logic.js';

const projectName = document.querySelector('#main-title');
const projectDesc = document.querySelector('#main-desc');
const editProjectName = document.querySelector('#edit-project-name');
const editProjectDesc = document.querySelector('#edit-project-desc');
const taskContainer = document.querySelector('#tasks-container');
const projectContainer = document.querySelector('#project-titles');

function renderProjects() {
  _clearProject();
  projectStorage.forEach((project, index) => {
    const projects = document.createElement('div');
    projects.dataset.value = index;
    projects.classList.add('project');
    if (project.active) {
      projects.classList.add('active');
    }
    projects.textContent = project.name;
    projectContainer.appendChild(projects);
  });
  createProjectBtnListeners();
}

function renderHeading() {
  projectName.innerText = activeProject().name;
  projectDesc.textContent = activeProject().desc;
  editProjectName.value = activeProject().name;
  editProjectDesc.value = activeProject().desc;
}

function renderTodo() {
  _clearToDo();
  activeProject().toDoList.forEach((item, index) => {
    const toDo = document.createElement('div');
    toDo.classList.add('todo');
    toDo.dataset.value = index;

    const leftTodo = document.createElement('div');
    leftTodo.classList.add('left-todo');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    if (item.complete) {
      checkbox.classList.add('checked');
    }
    leftTodo.appendChild(checkbox);

    const taskName = document.createElement('div');
    taskName.classList.add('taskname');
    taskName.textContent = item.name;
    leftTodo.appendChild(taskName);

    toDo.appendChild(leftTodo);

    const leftToDoEdit = document.createElement('div');
    leftToDoEdit.classList.add('left-todo-edit');

    const addTask = document.createElement('input');
    addTask.classList.add('add-task-name');
    addTask.type = 'text';
    addTask.placeholder = 'Task Name';

    leftToDoEdit.appendChild(addTask);
    toDo.appendChild(leftToDoEdit);

    const rightToDo = document.createElement('div');
    rightToDo.classList.add('right-todo');

    const taskTime = document.createElement('div');
    taskTime.classList.add('task-date');
    taskTime.textContent = `${moment(
      item.dueDate,
      'YYYY-MM-DD'
    ).fromNow()} (${moment(item.dueDate).toString().slice(4, 15)})`;
    rightToDo.appendChild(taskTime);

    const taskEdit = document.createElement('div');
    taskEdit.classList.add('task-edit-icon');
    rightToDo.appendChild(taskEdit);

    const taskDel = document.createElement('div');
    taskDel.classList.add('task-bin-icon');
    rightToDo.appendChild(taskDel);

    toDo.appendChild(rightToDo);

    const rightToDoEdit = document.createElement('div');
    rightToDoEdit.classList.add('right-todo-edit');

    const addTaskDate = document.createElement('input');
    addTaskDate.classList.add('add-task-date');
    addTaskDate.type = 'date';
    rightToDoEdit.appendChild(addTaskDate);

    const addTaskBtns = document.createElement('div');
    addTaskBtns.id = 'add-task-btns';
    rightToDoEdit.appendChild(addTaskBtns);
    const addTaskSubmit = document.createElement('p');
    addTaskSubmit.textContent = 'Submit';
    addTaskSubmit.classList.add('add-task-submit');
    addTaskBtns.appendChild(addTaskSubmit);
    const addTaskCancel = document.createElement('p');
    addTaskCancel.textContent = 'Cancel';
    addTaskCancel.classList.add('add-task-cancel');
    addTaskBtns.appendChild(addTaskCancel);

    rightToDoEdit.appendChild(addTaskBtns);
    toDo.appendChild(rightToDoEdit);

    taskContainer.appendChild(toDo);
  });
  createToDoBtnListeners();
}

function _clearProject() {
  projectContainer.innerHTML = '';
}

function _clearToDo() {
  taskContainer.innerHTML = '';
}

export {
  editProjectName,
  editProjectDesc,
  renderProjects,
  renderTodo,
  renderHeading,
};
