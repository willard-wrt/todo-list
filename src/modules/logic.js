import { renderProjects, renderTodo, renderHeading } from './render';
import { projectStorage } from '../index.js';

const createProject = (name, desc) => {
  _clearActiveProjects();
  projectStorage.push({ name, desc, toDoList: [], active: true });
  if (
    projectStorage.length > 1 ||
    projectStorage[0].name === 'Default-Project'
  ) {
    createToDo('Default Task', '2023-05-05');
  }
  renderProjects();
  renderHeading();
  renderTodo();
};

const createToDo = (name, dueDate) => {
  if (activeProject().toDoList.length === 0) {
    activeProject().toDoList.push({ name, dueDate, complete: true });
  } else {
    activeProject().toDoList.push({ name, dueDate, complete: false });
  }
};

function activeProject() {
  // eslint-disable-next-line prefer-const
  let activeProjectArray = projectStorage.filter((project) => project.active);
  return activeProjectArray[0];
}

function deleteProject(index) {
  projectStorage.splice(index, 1);
  createDefault();
  projectStorage[0].active = true;
  renderProjects();
  renderHeading();
  renderTodo();
  storeMyProjects();

  function createDefault() {
    if (projectStorage.length === 0) {
      createProject(
        'You can start from here =>',
        'Please edit this project or create a new project'
      );
    }
  }
}

function switchActiveProject(index) {
  _clearActiveProjects();
  projectStorage[index].active = true;
  renderProjects();
  renderHeading();
  renderTodo();
  storeMyProjects();
}

function _clearActiveProjects() {
  projectStorage.forEach((project) => (project.active = false));
}

function completeTodo(index) {
  activeProject().toDoList[index].complete = true;
  storeMyProjects();
}

function incompleteTodo(index) {
  activeProject().toDoList[index].complete = false;
  storeMyProjects();
}

function storeMyProjects() {
  window.localStorage.setItem('guest', JSON.stringify(projectStorage));
}

export {
  createProject,
  createToDo,
  activeProject,
  deleteProject,
  switchActiveProject,
  _clearActiveProjects,
  completeTodo,
  incompleteTodo,
  storeMyProjects,
};
