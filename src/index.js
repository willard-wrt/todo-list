import './style.css';

// console.log('webpack is working');
const projectStorage = [];
const createProject = (name, description) => {
  projectStorage.push({ name, description, toDoList: [], active: true });
};

const createTodo = (name, dueDate) => {
  activeProject().toDoList.push({ name, dueDate, complete: false });
};

function activeProject() {
  // eslint-disable-next-line prefer-const
  let activeProjectArray = projectStorage.filter((project) => project.active);
  return activeProjectArray[0];
}
