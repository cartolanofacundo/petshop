import { getItemsLS } from "./localStorage.js";

export const renderCards = (array, $container) => {
    let template = "";
    if(array.length === 0){
        $container.innerHTML = `<h2 class="title-secondary text-center my-5">No hay productos para mostrar</h2>`
        return 
    }
    for (let product of array) {
        template += templateProductCard(product, isInCart(product), getProductInCart(product), isFavorite(product))
    }
    $container.innerHTML = template;
}
export const isFavorite = (product) => {
    let productLocal = getItemsLS('favoritos')
    if (productLocal && productLocal.length != 0) {
        return productLocal.some(productFavorite => productFavorite._id === product._id);
    }
    return false
}
export const  getProductInCart = (product) => {
    let productLocal = getItemsLS('compras')
    if (productLocal && productLocal.length != 0) {
        return productLocal.filter(((cartProduct) => cartProduct._id === product._id))[0]
    }
    return false
}
function templateProductCard(product, isInCart = false, productCart = undefined, isFavorite = false) {
    return `<div class="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <div class="card product-card position-relative">
                            ${stockAlert(product.disponibles)}
                            ${favoriteButton(product, isFavorite)}
                            <div class="wrapper-image">
                            <img src="${product.imagen}" class="card-img-top" alt="${product.producto}">
                            </div>
                            
                            <div class="card-body position-relative">
                                <h5 class="card-title">${product.producto}</h5>
                                <p class="card-text">${product.categoria}</p>
                                <a class="stretched-link see-more-link" data-bs-toggle="modal" data-bs-target="#productModal" data-id="${product._id}">See more</a>
                            </div>
                            <div class="card-footer card-product-footer">
                                <span class="price-product">$${product.precio}</span>
                            ${cartButton(product, isInCart, productCart)}
                            </div>
                        </div>
                    </div>`
}
function stockAlert(stock) {
    let alert = ""
    if (stock === 0) {
        return `<span class="badge last-units-product position-absolute top-0 start-50 translate-middle">
                    No stock
                </span>`
    }
    if (stock >= 5) {
        return "";
    }
    if (stock < 5) {
        return `<span class="badge last-units-product position-absolute top-0 start-50 translate-middle">
                    Last units!
                </span>`
    }
    return alert;
}
function cartButton(product, isInCart = false, productCart) {
    let button = `<button href="#" class="btn btn-primary" data-compid=${product._id}> + Add</button>`
    if (product.disponibles === 0) {
        return `<button href="#" class="btn btn-primary" disabled> + Add</button>`
    }
    if (isInCart) {
        return `<div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" class="btn btn-outline-primary product-card-group p-2" data-decrementid="${product._id}"><i class="bi ${productCart.item === 1 ? "bi-trash" : "bi-dash"}"></i></button>
                    <button type="button" class="btn btn-outline-primary unit-btn-product p-2">${productCart.item} U.</button>
                    <button type="button" class="btn ${productCart.item === productCart.disponibles ? "btn-outline-secondary" : "btn-outline-primary"}  product-card-group p-2" data-incrementid="${product._id}" ${productCart.item === productCart.disponibles ? "disabled" : ""} ><i class="bi bi-plus"></i></button>
                </div>`
    }
    return button;
}
function favoriteButton(product, isFavorite = false) {
    let button = `<button class="btn btn-outline-info position-absolute favorite-button" data-favid=${product._id}><i class="bi bi-heart"></i></button>`
    if (isFavorite) {
        return ` <button class="btn btn-outline-info position-absolute favorite-button favorite-button-checked" data-favid=${product._id}><i class="bi bi-heart-fill"></i></button>`
    }
    return button;
}
function isInCart(product) {
    let productLocal = getItemsLS('compras');
    if (productLocal && productLocal.length != 0) {
        return productLocal.some(productCart => productCart._id === product._id)
    }
    return false;
}