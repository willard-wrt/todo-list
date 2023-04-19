import './style.css';
import './modules/listeners';
import { createProject } from './modules/logic';
import { renderProjects, renderHeading, renderTodo } from './modules/render';

// console.log('webpack is working');

let projectStorage = [];

const sidebarBgController = (() => {
  const sidebar = document.querySelector('#project-sidebar');
  const sidebarBG = document.querySelector('#sidebar-bg');
  sidebar.onmouseover = function () {
    sidebarBG.style.opacity = '40%';
  };
  sidebar.onmouseout = function () {
    sidebarBG.style.opacity = '90%';
  };
})();

if (localStorage.getItem('guest') == null) {
  createProject('Default-Project', 'An Example Project');
} else {
  projectStorage = JSON.parse(window.localStorage.getItem('guest'));
  renderProjects();
  renderHeading();
  renderTodo();
}

export { projectStorage };
