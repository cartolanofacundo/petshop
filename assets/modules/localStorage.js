export const getItemsLS = (key) => {
   return JSON.parse(localStorage.getItem(key)) || []
}
export const createItemsLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
export const incrementItemLS = (key, array, id) => {
    for(let item of array){
        if(item._id === id){
            item.item ++;
        }
    }
    localStorage.setItem(key, JSON.stringify(array))
    return array;
}
export const decrementItemLS = (key, array, id) => {
    for(let item of array){
        if(item._id === id){
            item.item --;
        }
        if(item.item === 0){
            return removeItemLS(key, array, item._id);
        }
    }
    localStorage.setItem(key, JSON.stringify(array));
    return array;
}
export const removeItemLS = (key, array, id) =>{
   let newArray = array.filter(item => item._id !== id);
   localStorage.setItem(key, JSON.stringify(newArray));
   return newArray
}
export const clearItemsLS = (key) => {
    let newArray = [];
    localStorage.removeItem(key);
    return newArray;
}