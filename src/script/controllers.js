import {getStorageData, setStorageData,
  addTaskToStorage, removeTaskFromStorage} from './storageHandler.js';
import render from './renderHandler.js';
import {createAddForm, createButtons, createRow} from './markupHandler.js';

const {renderTasks, updateTaskIndices, randomizeId} = render;

export const modalControl = (overlay, formAuth, list) => {
  const openModal = () => {
    overlay.style.display = 'flex';
  };
  const closeModal = () => {
    overlay.classList.remove('d-flex');
    overlay.style.display = 'none';
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const login = formAuth.login.value.trim();
    if (!login) return;

    let userTasks = getStorageData(login);
    if (!userTasks) {
      localStorage.setItem(login, JSON.stringify([]));
      userTasks = [];
    }

    localStorage.setItem('current-user', login);

    closeModal();
    formAuth.reset();
    renderTasks(list, userTasks);
  };


  formAuth.addEventListener('submit', handleAuth);
  document.addEventListener('keydown', e => {
    if (e.code === 'Enter' && overlay.style.display === 'flex') {
      handleAuth(e);
      closeModal();
    }
  });

  return {
    openModal,
  };
};

export const addTaskControl = (formAdd, list, idBounds) => {
  const saveButton = Array.from(formAdd.elements).find(
    (el) => el.type === 'submit',
  );
  const taskNameInput = formAdd.elements['taskName'];
  const importanceSelect = formAdd.elements['taskImportance'];

  const validateForm = () => {
    const isTaskNameValid = taskNameInput.value.trim() !== '';
    const isImportanceValid = importanceSelect.value !== '';
    saveButton.disabled = !(isTaskNameValid && isImportanceValid);
  };

  validateForm();

  taskNameInput.addEventListener('change', validateForm);
  importanceSelect.addEventListener('change', validateForm);

  let isEventHandled = false;

  const handleEvent = e => {
    if (isEventHandled) return;
    isEventHandled = true;

    e.preventDefault();
    if (!saveButton.disabled) {
      const taskName = taskNameInput.value.trim();
      const taskImportance = importanceSelect.value;
      const taskId = randomizeId(idBounds.min, idBounds.max);

      const newContact = {
        index: 5,
        taskId,
        taskName,
        taskStatus: 'Ожидает выполнения',
        taskImportance,
      };

      list.append(createRow(newContact));
      const login = getStorageData('current-user');
      addTaskToStorage(login, newContact);
      updateTaskIndices(list, login);

      const btnAdd = createButtons([
        {
          className: 'btn btn__add mr-3',
          type: 'button',
          text: 'ДОБАВИТЬ НОВУЮ ЗАДАЧУ',
        },
      ]);
      formAdd.replaceWith(btnAdd.btnWrapper);
    };
  };

  formAdd.addEventListener('submit', (e) => handleEvent(e));
  document.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' && !isEventHandled) {
      handleEvent(e);
    }
  });
};

export const addFormControl = (main, list, idBounds) => {
  main.addEventListener('click', e => {
    const target = e.target;
    const btnAdd = target.closest('.btn__add');
    if (btnAdd) {
      const formAdd = createAddForm();
      btnAdd.replaceWith(formAdd);
      addTaskControl(formAdd, list, idBounds);
    }
  });
};

export const deleteTaskControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const task = target.closest('.task');
      const agree = confirm(`Вы точно хотите удалить задачу?
№${task.taskId.textContent}: '${task.taskName.textContent}'`);
      if (agree) {
        task.remove();
        const login = getStorageData('current-user');
        removeTaskFromStorage(login, task.taskId.textContent);
        updateTaskIndices(list, login);
      }
    }
  });
};

export const editTaskControl = (list) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    const editButton = target.closest('.edit-icon');
    if (editButton) {
      const taskRow = editButton.closest('.task');
      if (taskRow && taskRow.taskName && taskRow.taskImportance) {
        const taskNameElement = taskRow.taskName;
        const taskImportanceElement = taskRow.taskImportance;

        taskNameElement.setAttribute('contenteditable', 'true');
        taskNameElement.classList.add('editable');
        taskNameElement.focus();

        const currentImportance = taskImportanceElement.textContent;
        const importanceSelect = document.createElement('select');
        importanceSelect.classList.add('select-editable');
        importanceSelect.innerHTML = `
          <option value="Обычная" ${currentImportance === 'Обычная' ?
          'selected' : ''}>Обычная</option>
          <option value="Важная" ${currentImportance === 'Важная' ?
          'selected' : ''}>Важная</option>
          <option value="Срочная" ${currentImportance === 'Срочная' ?
          'selected' : ''}>Срочная</option>
        `;

        taskImportanceElement.replaceWith(importanceSelect);
        let isTaskNameFocused = true;
        let isImportanceSelectFocused = false;
        let isSaving = false;

        const handleBlurTaskName = () => {
          isTaskNameFocused = false;
          setTimeout(() => saveChanges(), 100);
        };

        const handleBlurImportance = () => {
          isImportanceSelectFocused = false;
          setTimeout(() => saveChanges(), 100);
        };

        const handleKeyPress = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            isTaskNameFocused = false;
            isImportanceSelectFocused = false;
            saveChanges();
          }
        };

        const saveChanges = () => {
          if (isTaskNameFocused ||
            isImportanceSelectFocused || isSaving) return;

          isSaving = true;

          taskNameElement.setAttribute('contenteditable', 'false');
          taskNameElement.classList.remove('editable');
          importanceSelect.classList.remove('select-editable');

          const taskId = taskRow.taskId.textContent;
          const updatedTaskName = taskNameElement.textContent;
          const updatedTaskImportance = importanceSelect.value;

          let newImportanceClass;
          switch (updatedTaskImportance) {
            case 'Обычная':
              newImportanceClass = 'common';
              break;
            case 'Важная':
              newImportanceClass = 'important';
              break;
            case 'Срочная':
              newImportanceClass = 'urgent';
              break;
            default:
              newImportanceClass = 'false-importance';
          }

          if (importanceSelect.parentNode) {
            const newTaskImportanceElement = document.createElement('div');
            newTaskImportanceElement.className =
            `${newImportanceClass} container`;
            newTaskImportanceElement.textContent = updatedTaskImportance;
            importanceSelect.replaceWith(newTaskImportanceElement);
            taskRow.taskImportance = newTaskImportanceElement;
          }

          const login = getStorageData('current-user');
          const tasks = JSON.parse(localStorage.getItem(login)) || [];
          const taskIndex = tasks.findIndex((task) =>
            task.taskId === Number(taskId));

          if (taskIndex !== -1) {
            tasks[taskIndex].taskName = updatedTaskName;
            tasks[taskIndex].taskImportance = updatedTaskImportance;

            const importanceClasses = ['common', 'important', 'urgent'];
            taskRow.querySelectorAll('td').forEach((td) => {
              importanceClasses.forEach((cls) =>
                td.classList.remove(cls + '-td'));
            });

            taskRow.querySelectorAll('td').forEach((td) => {
              td.classList.add(newImportanceClass + '-td');
            });
            localStorage.setItem(login, JSON.stringify(tasks));
          }

          isSaving = false;

          taskNameElement.removeEventListener('blur', handleBlurTaskName);
          taskNameElement.removeEventListener('keypress', handleKeyPress);
          importanceSelect.removeEventListener('blur', handleBlurImportance);
          importanceSelect.removeEventListener('keypress', handleKeyPress);
        };

        taskNameElement.addEventListener('focus', () => {
          isTaskNameFocused = true;
        });

        importanceSelect.addEventListener('focus', () => {
          isImportanceSelectFocused = true;
        });

        taskNameElement.addEventListener('blur', handleBlurTaskName);
        taskNameElement.addEventListener('keypress', handleKeyPress);
        importanceSelect.addEventListener('blur', handleBlurImportance);
        importanceSelect.addEventListener('keypress', handleKeyPress);
      }
    }
  });
};

export const returnStateControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.return-icon')) {
      const task = target.closest('.task');
      if (task) {
        const importanceClasses = ['completed', 'processing'];
        task.querySelectorAll('td').forEach((td) => {
          importanceClasses.forEach((cls) => td.classList.remove(`${cls}-td`));
        });

        task.querySelectorAll('td').forEach((td) => {
          td.classList.add('processing-td');
        });

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

        const actions = task.querySelector('.completed-actions');
        actions.innerHTML = '';
        actions.append(tdEdit.btnWrapper, tdComplete.btnWrapper,
          tdDelete.btnWrapper);
        actions.classList.add('processing-actions');
        actions.classList.remove('completed-actions');

        const span = task.querySelector('.completed-span');
        span.classList.add('processing-span');
        span.classList.remove('completed-span');

        const taskName = task.querySelector('.completed-taskName');
        taskName.classList.add('processing-taskName');
        taskName.classList.remove('completed-taskName');

        const status = task.querySelector('.completed');
        status.textContent = 'Ожидает выполнения';
        status.classList.add('processing');
        status.classList.remove('completed');

        list.append(task);

        const login = getStorageData('current-user');
        const tasks = JSON.parse(localStorage.getItem(login)) || [];
        const taskId = Number(task.taskId.textContent);

        const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
        if (taskIndex !== -1) {
          tasks[taskIndex].taskStatus = 'Ожидает выполнения';
          localStorage.setItem(login, JSON.stringify(tasks));
        };
      };
    }
  });
};

export const finishTaskControl = (list) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.complete-icon')) {
      const taskRow = target.closest('.task');
      if (taskRow) {
        const importanceClasses = ['completed', 'processing'];
        taskRow.querySelectorAll('td').forEach((td) => {
          importanceClasses.forEach((cls) => td.classList.remove(`${cls}-td`));
        });

        const taskImportanceElement = taskRow.
          querySelector('.container .container');
        if (taskImportanceElement) {
          importanceClasses.forEach((cls) =>
            taskImportanceElement.classList.remove(cls));
        };

        taskRow.querySelectorAll('td').forEach((td) => {
          td.classList.add('completed-td');
        });

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

        const actions = taskRow.querySelector('.processing-actions');
        actions.innerHTML = '';
        actions.append(tdReturnState.btnWrapper, tdDelete.btnWrapper);
        actions.classList.add('completed-actions');
        actions.classList.remove('processing-actions');

        const span = taskRow.querySelector('.processing-span');
        span.classList.add('completed-span');
        span.classList.remove('processing-span');

        const taskName = taskRow.querySelector('.processing-taskName');
        taskName.classList.add('completed-taskName');
        taskName.classList.remove('processing-taskName');

        const status = taskRow.querySelector('.processing');
        status.textContent = 'Выполнено';
        status.classList.add('completed');
        status.classList.remove('processing');

        list.append(taskRow);

        const login = getStorageData('current-user');
        const tasks = JSON.parse(localStorage.getItem(login)) || [];
        const taskId = Number(taskRow.taskId.textContent);

        const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
        if (taskIndex !== -1) {
          tasks[taskIndex].taskStatus = 'Выполнено';
          localStorage.setItem(login, JSON.stringify(tasks));
        };

        updateTaskIndices(list, login);
      }
    }
  });
};

export const signOutControl = (header, openModal) => {
  header.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn__signOut')) {
      setStorageData('current-user', null);
      openModal();
    }
  });
};
