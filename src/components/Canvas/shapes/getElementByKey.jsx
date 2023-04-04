
function getElementByKey(arr, key){
    return arr.find(obj => {
      return obj.id === key ? obj : null;
    });
  }

export default getElementByKey;