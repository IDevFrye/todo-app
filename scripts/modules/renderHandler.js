import * as markup from './markupHandler.js';

const renderTodoApp = (app) => {
  app.classList.add('container-fluid', 'd-flex', 'flex-column');

  const header = markup.createHeader();
  const {h1, logo} = markup.createLogo();
  const main = markup.createMain();
  main.classList.add('main');
  const footer = markup.createFooter();
  const {p, h2} = markup.createSignature();
  const table = markup.createTable();
  const {overlay, formAuth} = markup.createModal();
  const formAdd = markup.createAddForm();
  const button =  markup.createButtons([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'ДОБАВИТЬ НОВУЮ ЗАДАЧУ',
    },
  ]);

  console.log('button: ', button);
  header.headerContainer.append(logo, h1);
  footer.footerContainer.append(h2, p);
  main.mainContainer.append(table, button.btnWrapper, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    thead: table.thead,
    logo,
    overlay,
    formAuth,
    formAdd,
  };
};

const renderTasks = (elem, data) => {
  const allRow = data.map(markup.createRow);
  elem.append(...allRow);

  return allRow;
};

export default {
  renderTodoApp,
  renderTasks,
};