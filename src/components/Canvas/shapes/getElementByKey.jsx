
function getElementByKey(arr, key){
    return arr.find(obj => {
      return obj.key === key ? obj : null;
    });
  }

export default getElementByKey;