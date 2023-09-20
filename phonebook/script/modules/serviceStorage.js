const getStorage = key => JSON.parse(localStorage.getItem(key)) ?? [];

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (key, phone) => {
  const data = getStorage(key);
  const index = data.findIndex(item => item.phone === phone);
  data.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(data));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
