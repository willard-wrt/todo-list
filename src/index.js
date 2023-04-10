import './style.css';

// console.log('webpack is working');
const projectContainer = document.querySelector('#project-titles');

const projectStorage = [];
const createProject = (name, description) => {
  projectStorage.push({ name, description, toDoList: [], active: true });
  createToDo('Default Task', 'xx-xx-xx');
  renderProjects();
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

function createProjectbtnListeners() {
  const projects = document.querySelectorAll('.project');
  projects.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      switchActiveProject(e.target.dataset.value);
    })
  );
}

/* 
createProject('Default-Project', 'An Example Project');
createToDo('test', 'test');
*/
