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
    rightToDoEdit.appendChild(addTaskDate);

    const addTaskBtns = document.createElement('div');
    rightToDoEdit.appendChild(addTaskBtns);
    const addTaskSubmit = document.createElement('p');
    addTaskSubmit.classList.add('add-task-submit');
    addTaskBtns.appendChild(addTaskSubmit);
    const addTaskCancel = document.createElement('p');
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

newProjectDom.newProjectBtn.addEventListener('click', newProjectDom.show);
newProjectDom.cancelProjectBtn.addEventListener('click', newProjectDom.hide);
newProjectDom.submitProjectBtn.addEventListener('click', newProjectDom.add);

createProject('Default-Project', 'An Example Project');
