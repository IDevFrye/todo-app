export const getStorageData = (key) => {
  const storedData = localStorage.getItem(key);
  try {
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    return storedData;
  }
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addTaskToStorage = (login, task) => {
  const tasks = getStorageData(login) || [];
  tasks.push(task);
  setStorageData(login, tasks);
};

export const removeTaskFromStorage = (login, taskId) => {
  const tasks = getStorageData(login) || [];
  const updatedTasks = tasks.filter(task => task.taskId !== Number(taskId));
  setStorageData(login, updatedTasks);
};
