import render from './script/renderHandler.js';
import * as control from './script/controllers.js';

import './index.html';
import './css/style.css';
import './scss/index.scss';

const {renderTodoApp, renderTasks} = render;

export const initTodoApp = (selectorApp, idBounds) => {
  const app = document.querySelector(selectorApp);

  const {
    main,
    header,
    list,
    overlay,
    formAuth,
  } = renderTodoApp(app);

  overlay.style.display = 'flex';

  const {openModal} = control.modalControl(overlay, formAuth, list);
  control.signOutControl(header, openModal);
  control.finishTaskControl(list);
  control.deleteTaskControl(list);
  control.editTaskControl(list);
  control.addFormControl(main, list, idBounds);
  control.returnStateControl(list);

  const currentUser = localStorage.getItem('current-user');
  if (currentUser) {
    const userTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    renderTasks(list, userTasks);
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
  }
};

const idBounds = {
  min: 100000000,
  max: 3000000000,
};
document.addEventListener('DOMContentLoaded', () => {
  initTodoApp('.app-container', idBounds);
});
