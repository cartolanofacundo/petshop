import {  isFavorite} from "./productsLogic.js";
export const filterProducts = (filterString, products, checkbox) => {
    let result = products
    if (checkbox.length !== 0) {
        for (let check of checkbox) {
            if (check === "favorito") {
                result = filterFavorites(products)
            }
        }
    }
    result = filterSearch(result, filterString)
    return result
}
export const filterFavorites = (array) => {
    return array.filter((product) => isFavorite(product))
}
export const filterSearch = (array, searchString) => {
    if (!searchString || searchString === "") {
        return array;
    }
    return array.filter(product => product.producto.toLowerCase().includes(searchString.toLowerCase()))
}
