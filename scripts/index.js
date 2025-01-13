import render from './modules/renderHandler.js';

const {renderTodoApp, renderTasks} = render;

export const initTodoApp = (selectorApp) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    thead,
    logo,
    overlay,
    formAuth,
    formAdd,
  } = renderTodoApp(app);


  overlay.style.display = 'flex';
};