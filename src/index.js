import './style.css';

// console.log('webpack is working');
const projectContainer = document.querySelector('#project-titles');
const projectName = document.querySelector('#main-name');
const projectDesc = document.querySelector('#main-desc');
const editProjectName = document.querySelector('#edit-project-name');
const editProjectDesc = document.querySelector('#edit-project-desc');

const projectStorage = [];
const createProject = (name, desc) => {
  projectStorage.push({ name, desc, toDoList: [], active: true });
  createToDo('Default Task', 'xx-xx-xx');
  renderProjects();
  renderHeading();
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
  // renderProjects();
  // renderHeading();
  // renderTodo();
}
function _clearProject() {
  projectContainer.innerHTML = '';
}
function _clearActiveProjects() {
  projectStorage.forEach((project) => (project.active = false));
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

function createProjectbtnListeners() {
  const projects = document.querySelectorAll('.project');
  projects.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      switchActiveProject(e.target.dataset.value);
    })
  );
}

/* createProject('Default-Project', 'An Example Project');
createToDo('test', 'test'); */
