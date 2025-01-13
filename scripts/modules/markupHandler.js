const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('bg-light', 'py-3', 'mb-4', 'border-bottom');

  const headerContainer = createContainer();
  headerContainer.classList.add('d-flex', 'align-items-center', 'justify-content-start');
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

export const createLogo = () => {
  const h1 = document.createElement('h1');
  h1.classList.add('header__text', 'mb-0', 'd-flex', 'align-items-center');

  const logo = document.createElement('img');
  logo.classList.add('header__logo', 'me-2');
  logo.src = '../../img/header_icon.png';
  logo.alt = 'Logo';
  logo.style.width = '70px';

  h1.textContent = 'TodoApp';

  return {
    h1,
    logo,
  };
};


export const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();

  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

export const createFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer', 'mt-4');

  const footerContainer = createContainer();
  footerContainer.classList.add('d-flex', 'align-items-center', 'justify-content-between');

  footer.append(footerContainer);
  footer.footerContainer = footerContainer;

  return footer;
};

export const createSignature = () => {
  const p = document.createElement('p');
  p.classList.add('footer__p', 'text-muted', 'mb-0');
  p.textContent = `${String.fromCharCode(169)} 2025 Andrey Kostin All Rights Reserved.`;

  const h2 = document.createElement('h2');
  h2.classList.add('footer__text', 'text-white', 'mb-1');
  h2.textContent = 'TodoApp';

  return {
    p,
    h2,
  }
};

export const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay', 'd-flex');

  const modal = document.createElement('div');
  modal.classList.add('modal-back', 'bg-black', 'shadow', 'text-center');

  const h1 = document.createElement('h1');
  h1.classList.add('modal__text');
  h1.textContent = 'TodoApp';

  const logo = document.createElement('img');
  logo.classList.add('modal__img', 'mb-3');
  logo.src = '../../img/icon.png';

  const form = document.createElement('form');
  form.classList.add('form', 'form__auth', 'mt-3');
  
  form.insertAdjacentHTML(
    'beforeend',
    `
    <div class="mb-3">
      <input
        class="form-control form-input"
        name="login"
        id="login"
        type="text"
        placeholder="Ваш логин"
        required
      />
    </div>
    <button class="btn w-50 btn-modal" type="submit">Войти</button>
    `
  );

  modal.append(logo, h1, form);
  overlay.append(modal);

  return {
    overlay,
    form,
  };
};

export const createAddForm = () => {
  const form = document.createElement('form');
  form.classList.add('form', 'form__add');
  form.insertAdjacentHTML('afterbegin', `
    <div class="form-group">
      <input class="form-input" name="taskName" 
      id="taskName" type="text" placeholder="Введите задачу" required>
    </div>
    <div class="form-group">
      <select class="form-select" name="taskName" id="taskName" required>
        <option value="">Важность</option>
        <option value="table-light">Обычная</option>
        <option value="table-warning">Важная</option>
        <option value="table-danger">Срочная</option>
      </select>
    </div>
    `);
  
  const buttonGroup = createButtons([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup.btns);

  return form;
};

export const createButtons = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper', 'd-flex', 'justify-content-center', 'gap-2', 'mt-4');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.className = `btn ${className}`;
    button.textContent = text;
    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover');

  const thead = document.createElement('thead');
  thead.classList.add('table-light');
  thead.innerHTML = `
    <tr>
      <th scope="col">#</th>
      <th scope="col">Задача</th>
      <th scope="col">Статус</th>
      <th scope="col">Действия</th>
    </tr>
  `;

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.thead = thead;
  table.tbody = tbody;

  return table;
};

export const createRow = ({index, taskName, taskStatus}) => {
  const tr = document.createElement('tr');
  tr.classList.add('task');

  const tdIndex = document.createElement('td');
  tdIndex.textContent = index;

  const tdTask = document.createElement('td');
  tdTask.textContent = taskName;

  const tdStatus = document.createElement('td');
  tdStatusContainer = document.createElement('div');
  tdStatusContainer.classList.add('task__status');
  tdStatusContainer.textContent = taskStatus;
  tdStatus.append(tdStatusContainer);

  const tdActions = document.createElement('td');

  const tdEdit = createButtons([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: '',
    },
  ]);
  tdEdit.classList.add('edit-icon');
  tdEdit.btns[0].innerHTML =
  `<i class="fa-solid fa-pen"></i>`;
  tdEdit.btnWrapper.style.marginBottom = 0;
  tdEdit.append(tdEdit.btnWrapper);

  const tdComplete = createButtons([
    {
      className: 'btn btn-success mr-3',
      type: 'button',
      text: '',
    },
  ]);
  tdComplete.classList.add('complete-icon');
  tdComplete.btns[0].innerHTML =
  `<i class="fa-solid fa-check"></i>`;
  tdComplete.btnWrapper.style.marginBottom = 0;
  tdComplete.append(tdComplete.btnWrapper);

  const tdDelete = createButtons([
    {
      className: 'btn btn-error mr-3',
      type: 'button',
      text: '',
    },
  ]);
  tdDelete.classList.add('del-icon');
  tdDelete.btns[0].innerHTML =
  `<i class="fa-solid fa-trash-can"></i>`;
  tdDelete.btnWrapper.style.marginBottom = 0;
  tdDelete.append(tdDelete.btnWrapper);

  tdActions.append(tdEdit, tdComplete, tdDelete);

  tr.append(tdIndex, tdTask, tdStatus, tdActions);

  return tr;
};

export const addTaskToList = (task, list) => {
  list.append(createRow(task));
};

export const removeTaskFromList = (task, list) => {

};
