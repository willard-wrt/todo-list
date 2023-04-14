import './style.css';
import moment from 'moment';

// console.log('webpack is working');
const projectContainer = document.querySelector('#project-titles');
const taskContainer = document.querySelector('#tasks-container');
const projectName = document.querySelector('#main-name');
const projectDesc = document.querySelector('#main-desc');
const editProjectName = document.querySelector('#edit-project-name');
const editProjectDesc = document.querySelector('#edit-project-desc');

const projectStorage = [];
const createProject = (name, desc) => {
  _clearActiveProjects();
  projectStorage.push({ name, desc, toDoList: [], active: true });
  createToDo('Default Task', '2023-05-05');
  renderProjects();
  renderHeading();
  renderTodo();
};

const createToDo = (name, dueDate) => {
  activeProject().toDoList.push({ name, dueDate, complete: false });
};

function activeProject() {
  // eslint-disable-next-line prefer-const
  let activeProjectArray = projectStorage.filter((project) => project.active);
  return activeProjectArray[0];
}

function switchActiveProject(index) {
  _clearActiveProjects();
  projectStorage[index].active = true;
  renderProjects();
  renderHeading();
  renderTodo();
}
function _clearProject() {
  projectContainer.innerHTML = '';
}

function _clearToDo() {
  taskContainer.innerHTML = '';
}

function _clearActiveProjects() {
  projectStorage.forEach((project) => (project.active = false));
}

function completeTodo(index) {
  activeProject().toDoList[index].complete = true;
}

function incompleteTodo(index) {
  activeProject().toDoList[index].complete = false;
}

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
  const projectEditIcon = document.createElement('div');
  projectEditIcon.id = 'title-edit';
  projectName.textContent = activeProject().name;
  projectName.appendChild(projectEditIcon);
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
    taskTime.textContent = moment(item.dueDate, 'YYYY-MM-DD').fromNow();
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
    _leftToDo[index].style.display = 'none';
    _rightToDo[index].style.display = 'none';
    _leftToDoEdit[index].style.display = 'flex';
    _rightToDoEdit[index].style.display = 'flex';
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
    }
  }

  function del(index) {
    activeProject().toDoList.splice(index, 1);
    renderTodo();
  }

  return { show, hide, submit, del };
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
      hide();
      renderTodo();
    }
  }
  return { addTask, addTaskSubmit, addTaskCancel, show, hide, submit };
})();

newProjectDom.newProjectBtn.addEventListener('click', newProjectDom.show);
newProjectDom.cancelProjectBtn.addEventListener('click', newProjectDom.hide);
newProjectDom.submitProjectBtn.addEventListener('click', newProjectDom.add);
addToDo.addTask.addEventListener('click', addToDo.show);
addToDo.addTaskSubmit.addEventListener('click', addToDo.submit);
addToDo.addTaskCancel.addEventListener('click', addToDo.hide);

createProject('Default-Project', 'An Example Project');
