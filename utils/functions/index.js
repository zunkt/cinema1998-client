import removeSignsForVNString from './removeSignsForVNString';

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return (array || []).reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};


export {
  convertArrayToObject,
  removeSignsForVNString
}
