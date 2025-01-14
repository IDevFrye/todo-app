import render from './modules/renderHandler.js';
import * as control from './modules/controllers.js';

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

  const currentUser = localStorage.getItem('current-user');
  if (currentUser) {
    const userTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    renderTasks(list, userTasks);
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
  }
};
