import * as markup from './markupHandler.js';

const renderTodoApp = (app) => {
  app.classList.add('container-fluid', 'd-flex', 'flex-column');

  const header = markup.createHeader();
  const {leftBlock, signOutButton} = markup.createLogo();
  const main = markup.createMain();
  main.classList.add('main');
  const footer = markup.createFooter();
  const {p, h2} = markup.createSignature();
  const table = markup.createTable();
  const {overlay, form} = markup.createModal();
  const button =  markup.createButtons([
    {
      className: 'btn btn__add mr-3',
      type: 'button',
      text: 'ДОБАВИТЬ НОВУЮ ЗАДАЧУ',
    },
  ]);

  header.headerContainer.append(leftBlock, signOutButton.btnWrapper);
  footer.footerContainer.append(h2, p);
  main.mainContainer.append(table, button.btnWrapper, overlay);
  app.append(header, main, footer);

  return {
    main,
    header,
    list: table.tbody,
    overlay,
    formAuth: form,
  };
};

const renderTasks = (elem, data) => {
  elem.innerHTML = '';
  const allRow = data.map(markup.createRow);
  elem.append(...allRow);

  return allRow;
};

export const randomizeId = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const sortTasksInStorage = (login) => {
  const tasks = JSON.parse(localStorage.getItem(login)) || [];
  tasks.sort((a, b) => a.index - b.index);
  localStorage.setItem(login, JSON.stringify(tasks));
};

const updateTaskIndices = (list, login) => {
  const tasks = JSON.parse(localStorage.getItem(login)) || [];

  const taskRows = list.querySelectorAll('.task');
  taskRows.forEach((row, index) => {
    const taskIndexElement = row.querySelector('.task-index');
    if (taskIndexElement) {
      taskIndexElement.textContent = index + 1;
    }
    
    const taskId = row.querySelector('.task__idn')?.textContent;
    const taskData = tasks.find((t) => t.taskId === Number(taskId));
    if (taskData) {
      taskData.index = index;
    }
  });

  localStorage.setItem(login, JSON.stringify(tasks));

  sortTasksInStorage(login);
};

export default {
  randomizeId,
  renderTodoApp,
  renderTasks,
  updateTaskIndices,
};
