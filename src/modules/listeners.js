import { projectStorage } from '../index.js';
import {
  deleteProject,
  activeProject,
  switchActiveProject,
  incompleteTodo,
  completeTodo,
} from './logic.js';
import { renderTodo } from './render.js';
import {
  editToDo,
  newProjectDom,
  editProjectDom,
  addToDo,
} from './domFunctionality.js';

const delProject = document.querySelector('#del-project');

function createProjectBtnListeners() {
  const projects = document.querySelectorAll('.project');
  projects.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      switchActiveProject(e.target.dataset.value);
    })
  );
}

function createToDoBtnListeners() {
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('checked')) {
        incompleteTodo(e.target.parentNode.parentNode.dataset.value);
      } else {
        completeTodo(e.target.parentNode.parentNode.dataset.value);
      }
      renderTodo();
    })
  );
  const taskEdit = document.querySelectorAll('.task-edit-icon');
  taskEdit.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      editToDo.show(e.target.parentNode.parentNode.dataset.value);
    })
  );
  const taskDel = document.querySelectorAll('.task-bin-icon');
  taskDel.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      editToDo.del(e.target.parentNode.parentNode.dataset.value);
    })
  );

  const taskEditCancel = document.querySelectorAll('.add-task-cancel');
  taskEditCancel.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      editToDo.hide(e.target.parentNode.parentNode.parentNode.dataset.value);
    })
  );
  const taskEditSubmit = document.querySelectorAll('.add-task-submit');
  taskEditSubmit.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      editToDo.submit(e.target.parentNode.parentNode.parentNode.dataset.value);
    })
  );
}

newProjectDom.newProjectBtn.addEventListener('click', newProjectDom.show);
newProjectDom.cancelProjectBtn.addEventListener('click', newProjectDom.hide);
newProjectDom.submitProjectBtn.addEventListener('click', newProjectDom.add);
editProjectDom.titleEditBtn.addEventListener('click', editProjectDom.show);
editProjectDom.projectEditSubmit.addEventListener(
  'click',
  editProjectDom.submit
);
editProjectDom.projectEditCancel.addEventListener('click', editProjectDom.hide);
addToDo.addTask.addEventListener('click', addToDo.show);
addToDo.addTaskSubmit.addEventListener('click', addToDo.submit);
addToDo.addTaskCancel.addEventListener('click', addToDo.hide);

delProject.addEventListener('click', () => {
  deleteProject(projectStorage.indexOf(activeProject()));
});

export { createProjectBtnListeners, createToDoBtnListeners };
