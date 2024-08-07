const setListInLocalStorage = (key, list) => {
      const jsonString = JSON.stringify(list);
      localStorage.setItem(key, jsonString);
    };

const getListFromLocalStorage = (key) => {
  const jsonString = localStorage.getItem(key);
  return jsonString ? JSON.parse(jsonString) : [];
};

export {setListInLocalStorage, getListFromLocalStorage};