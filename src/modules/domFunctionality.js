import {
  editProjectName,
  editProjectDesc,
  renderProjects,
  renderHeading,
  renderTodo,
} from './render';
import {
  createProject,
  createToDo,
  activeProject,
  storeMyProjects,
} from './logic';

const newProjectDom = (() => {
  const newProjectBtn = document.querySelector('#add-project');
  const submitProjectBtn = document.querySelector('#project-add-submit');
  const cancelProjectBtn = document.querySelector('#project-add-cancel');
  const _newProjectWindow = document.querySelector('#window-container');
  const _projectNameInput = document.querySelector('#project-name');
  const _projectDescInput = document.querySelector('#project-desc');
  function show() {
    _newProjectWindow.style.display = 'flex';
  }
  function hide() {
    _newProjectWindow.style.display = 'none';
    _clear();
  }
  function _clear() {
    _projectNameInput.value = '';
    _projectDescInput.value = '';
  }

  function add() {
    if (_projectNameInput.value !== '' && _projectDescInput.value !== '') {
      createProject(_projectNameInput.value, _projectDescInput.value);
      storeMyProjects();
      hide();
    }
  }
  return {
    show,
    hide,
    add,
    newProjectBtn,
    submitProjectBtn,
    cancelProjectBtn,
  };
})();

const editToDo = (() => {
  function show(index) {
    const _leftToDo = document.querySelectorAll('.left-todo');
    const _rightToDo = document.querySelectorAll('.right-todo');
    const _leftToDoEdit = document.querySelectorAll('.left-todo-edit');
    const _rightToDoEdit = document.querySelectorAll('.right-todo-edit');
    const _nameInput = document.querySelectorAll('.add-task-name');
    const _dateInput = document.querySelectorAll('.add-task-date');

    _leftToDo[index].style.display = 'none';
    _rightToDo[index].style.display = 'none';
    _leftToDoEdit[index].style.display = 'flex';
    _rightToDoEdit[index].style.display = 'flex';
    _nameInput[index].value = activeProject().toDoList[index].name;
    _dateInput[index].value = activeProject().toDoList[index].dueDate;
  }

  function hide(index) {
    const _leftToDo = document.querySelectorAll('.left-todo');
    const _rightToDo = document.querySelectorAll('.right-todo');
    const _leftToDoEdit = document.querySelectorAll('.left-todo-edit');
    const _rightToDoEdit = document.querySelectorAll('.right-todo-edit');
    _leftToDo[index].style.display = 'flex';
    _rightToDo[index].style.display = 'flex';
    _leftToDoEdit[index].style.display = 'none';
    _rightToDoEdit[index].style.display = 'none';
  }

  function submit(index) {
    const _toDoName = document.querySelectorAll('.add-task-name');
    const _toDoDate = document.querySelectorAll('.add-task-date');
    if (_toDoName[index].value !== '' && _toDoDate[index].value !== '') {
      activeProject().toDoList[index].name = _toDoName[index].value;
      activeProject().toDoList[index].dueDate = _toDoDate[index].value;
      renderTodo();
      storeMyProjects();
    }
  }

  function del(index) {
    activeProject().toDoList.splice(index, 1);
    renderTodo();
    storeMyProjects();
  }

  return { show, hide, submit, del };
})();

const editProjectDom = (() => {
  const titleEditBtn = document.querySelector('#title-edit');
  const _projectInfoBox = document.querySelector('#project-info-container');
  const _projectEditBox = document.querySelector('#project-edit-container');
  const projectEditSubmit = document.querySelector('#project-edit-submit');
  const projectEditCancel = document.querySelector('#project-edit-cancel');

  function show() {
    _projectInfoBox.style.display = 'none';
    _projectEditBox.style.display = 'flex';
  }

  function hide() {
    _projectInfoBox.style.display = 'flex';
    _projectEditBox.style.display = 'none';
    renderHeading();
  }

  function submit() {
    activeProject().name = editProjectName.value;
    activeProject().desc = editProjectDesc.value;
    renderProjects();
    renderHeading();
    storeMyProjects();
    hide();
  }

  return {
    show,
    hide,
    submit,
    titleEditBtn,
    projectEditSubmit,
    projectEditCancel,
  };
})();

const addToDo = (() => {
  const addTask = document.querySelector('#add-task');
  const addTaskSubmit = document.querySelector('.form-task-submit');
  const addTaskCancel = document.querySelector('.form-task-cancel');
  const _addTaskForm = document.querySelector('#add-task-form');
  const _addTaskName = document.querySelector('.form-task-name');
  const _addTaskDate = document.querySelector('.form-task-date');

  function show() {
    _addTaskForm.style.display = 'flex';
    addTask.style.display = 'none';
  }

  function hide() {
    addTask.style.display = 'flex';
    _addTaskForm.style.display = 'none';
    _clear();
  }

  function _clear() {
    _addTaskName.value = '';
    _addTaskDate.value = '';
  }

  function submit() {
    if (_addTaskName.value !== '' && _addTaskDate.value !== '') {
      createToDo(_addTaskName.value, _addTaskDate.value);
      renderTodo();
      storeMyProjects();
      hide();
    }
  }
  return { addTask, addTaskSubmit, addTaskCancel, show, hide, submit };
})();

export { newProjectDom, editToDo, editProjectDom, addToDo };
