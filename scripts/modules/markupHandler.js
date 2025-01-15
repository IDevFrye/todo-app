const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

export const createButtons = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add(
    'btn-wrapper', 'd-flex', 'justify-content-center', 'gap-2');

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

export const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add(
    'bg-light', 'py-3', 'mb-4', 'border-bottom');

  const headerContainer = createContainer();
  headerContainer.classList.add(
    'd-flex', 'align-items-center', 'justify-content-between');
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

  const leftBlock = createContainer();
  leftBlock.classList.add('d-flex', 'align-items-center');
  leftBlock.append(logo, h1);

  const button = createButtons([
    {
      className: 'btn btn__signOut signout-button',
      type: 'button',
      text: '',
    },
  ]);
  button.btns[0].innerHTML =
  `<i class="fa-solid fa-arrow-right-from-bracket"></i>`;
  button.btnWrapper.style.marginBottom = 0;

  return {
    leftBlock,
    signOutButton: button,
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
  footerContainer.classList.add(
    'd-flex', 'align-items-center', 'justify-content-between');

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
  };
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
    <button class="btn w-50 btn-modal btn__auth" type="submit">Войти</button>
    `,
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
      <select class="form-select" name="taskImportance" id="taskImportance" required>
        <option value="">Важность</option>
        <option value="Обычная">Обычная</option>
        <option value="Важная">Важная</option>
        <option value="Срочная">Срочная</option>
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

  buttonGroup.btns[0].disabled = true;

  form.append(...buttonGroup.btns);

  return form;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover');

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

export const createRow = (
    {index, taskId, taskName, taskStatus, taskImportance}) => {
  const tr = document.createElement('tr');
  tr.classList.add('task');

  let statusClass;
  switch (taskStatus) {
    case ('Ожидает выполнения'): {
      statusClass = 'processing';
      break;
    }
    case ('Выполнено'): {
      statusClass = 'completed';
      break;
    }
    default: {
      statusClass = 'false-status';
    }
  };

  let importanceClass;
  switch (taskImportance) {
    case ('Обычная'): {
      importanceClass = 'common';
      break;
    }
    case ('Важная'): {
      importanceClass = 'important';
      break;
    }
    case ('Срочная'): {
      importanceClass = 'urgent';
      break;
    }
    default: {
      importanceClass = 'false-importance';
    }
  };

  const tdIndex = document.createElement('td');
  tdIndex.classList.add(
    importanceClass + '-td', statusClass + '-td', 'task-index');
  tdIndex.textContent = index + 1;

  const tdTask = document.createElement('td');
  tdTask.classList.add(importanceClass + '-td', statusClass + '-td');
  const tdTaskCont = createContainer();
  tdTaskCont.classList.add('d-flex', 'p-0');

  const leftName = createContainer();
  leftName.classList.add('d-flex', 'flex-column', 'p-0', 'left-container');

  const taskIdTd = createContainer();
  taskIdTd.append(`ID: `);
  const taskIdTdNumber = document.createElement('span');
  taskIdTdNumber.classList.add('task__idn');
  taskIdTdNumber.append(taskId);
  taskIdTd.append(taskIdTdNumber);
  taskIdTd.classList.add('task__id', 'p-0');
  const taskNameTd = createContainer();
  taskNameTd.append(taskName);
  taskNameTd.classList.add(statusClass + '-taskName', 'p-0', 'task__name');
  tr.taskId = taskIdTdNumber;
  tr.taskName = taskNameTd;

  leftName.append(taskIdTd, taskNameTd);

  const taskImportanceTd = createContainer();
  taskImportanceTd.classList.add('right-container');
  const taskImportanceSpan = document.createElement('div');
  taskImportanceSpan.classList.add(
    'container', importanceClass, `${statusClass}-span`);
  taskImportanceSpan.textContent = taskImportance;
  taskImportanceTd.append(taskImportanceSpan);
  tr.taskImportance = taskImportanceSpan;

  tdTaskCont.append(leftName, taskImportanceTd);
  tdTask.append(tdTaskCont);

  const tdStatus = document.createElement('td');
  tdStatus.classList.add(importanceClass + '-td', statusClass + '-td');
  const tdStatusContainer = document.createElement('div');
  tdStatusContainer.classList.add(statusClass);
  tdStatusContainer.textContent = taskStatus;
  tdStatus.append(tdStatusContainer);

  const tdActions = document.createElement('td');
  tdActions.classList.add(
    'd-flex', 'justify-content-start', statusClass + '-actions',
    importanceClass + '-td', statusClass + '-td');

  if (statusClass === 'completed') {
    const tdReturnState = createButtons([
      {
        className: 'btn mr-3 return-icon',
        type: 'button',
        text: '',
      },
    ]);
    tdReturnState.btns[0].innerHTML =
    `<i class="fa-solid fa-arrow-rotate-right"></i>`;
    tdReturnState.btnWrapper.style.marginBottom = 0;

    const tdDelete = createButtons([
      {
        className: 'btn mr-3 del-icon',
        type: 'button',
        text: '',
      },
    ]);
    tdDelete.btns[0].innerHTML =
    `<i class="fa-solid fa-trash-can"></i>`;
    tdDelete.btnWrapper.style.marginBottom = 0;
    tdActions.append(
      tdReturnState.btnWrapper, tdDelete.btnWrapper);
  } else {
    const tdEdit = createButtons([
      {
        className: 'btn mr-3 edit-icon',
        type: 'button',
        text: '',
      },
    ]);
    tdEdit.btns[0].innerHTML =
    `<i class="fa-solid fa-pen"></i>`;
    tdEdit.btnWrapper.style.marginBottom = 0;

    const tdComplete = createButtons([
      {
        className: 'btn mr-3 complete-icon',
        type: 'button',
        text: '',
      },
    ]);
    tdComplete.btns[0].innerHTML =
    `<i class="fa-solid fa-check"></i>`;
    tdComplete.btnWrapper.style.marginBottom = 0;

    const tdDelete = createButtons([
      {
        className: 'btn mr-3 del-icon',
        type: 'button',
        text: '',
      },
    ]);
    tdDelete.btns[0].innerHTML =
    `<i class="fa-solid fa-trash-can"></i>`;
    tdDelete.btnWrapper.style.marginBottom = 0;

    tdActions.append(
      tdEdit.btnWrapper, tdComplete.btnWrapper, tdDelete.btnWrapper);
  }

  tr.append(tdIndex, tdTask, tdStatus, tdActions);

  return tr;
};
