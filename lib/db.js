const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('../store');

function LocalDB(_node) {
  let node = _node

  function find(id) {
    try {
      let result = localStorage.getItem(node);

      result = JSON.parse(result);
  
      if (result && result.length) {
        return result.find(item => item.id === id);
      }
    } catch(error) {
      console.error(error);
    }

    return null;
  }

  function create(data) {
    if (!data) return false;

    try { 
      let current = localStorage.getItem(node);
      current = JSON.parse(current);
  
      if (current) {
        const newItem = JSON.stringify([...current, data]);
  
        localStorage.setItem(node, newItem);
  
        return data;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  function update(id, data) {
    try {
      let current = localStorage.getItem(node);

      if (!current) return false;

      current = JSON.parse(current);

      const newItem = current.reduce((acc, item) => {
        if (item.id === id) {
          return [...acc, { id, ...data }];
        }
        return [...acc, ...item];
      }, [])
      
      localStorage.setItem(node, JSON.stringify(newItem));

    } catch(error) {
      console.error(error);
    }

    return false;
  }

  function all() {
    try {
      let result = localStorage.getItem(node);
      
      if (!result) return [];

      return JSON.parse(result);

    } catch (error) {
      console.error(error);
    }

    return null;
  }

  function reset() {
    localStorage.clear();

    const accounts = [];

    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  return {
    find,
    create,
    update,
    all,
    reset
  }
}

module.exports = LocalDB;
