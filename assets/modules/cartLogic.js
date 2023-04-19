export const renderCart = (array, $container) => {
    let $subcontainer = document.getElementById("priceCart")
    let $checkoutButton = document.getElementById("checkoutButtonCart")
    let $removeAllItems = document.getElementById("removeAllButton");

    let template = ""
    if (array.length === 0) {
        $container.innerHTML = `<span class="price-cart-product my-5 text-center">No hay productos para mostrar</span>`
        $subcontainer.innerHTML = "-"
        
        $checkoutButton.disabled = true;
        $removeAllItems.disabled = true;
        return
    }
    for (let product of array) {
        template += createCardCart(product)
    }
    $container.innerHTML = template
    $subcontainer.innerHTML = subtotal(array);
    $checkoutButton.disabled = false;
    $removeAllItems.disabled = false;
}
export const createCardCart = (product) => {
    
    let template = `
    <div class="row cart-product-container p-2 mb-3">
        <div class="col-3">
            <img src="${product.imagen}" class="img-thumbnail" alt="">
        </div>
        <div class="col-9">
            <div class="row mb-2">
                <span class="title-cart-product">${product.producto}</span>
                <span class="category-cart-product">${product.categoria}</span>
            </div>
            <div class="row">
                <div class="col-4">
                    <span class="price-cart-product">$${product.precio}</span><span class="price-cart-product-bajada">C/U</span>
                </div>
                <div class="col-8">
                    <div class="text-center">
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-outline-primary" data-decrementid="${product._id}"><i class="bi ${product.item === 1 ? "bi-trash" : "bi-dash"}"></i></button>
                            <button type="button" class="btn btn-outline-primary unit-btn">${product.item} U.</button>
                            <button type="button" class="btn ${product.item === product.disponibles ? "btn-outline-secondary" : "btn-outline-primary"}" ${product.item === product.disponibles ? "disabled" : ""} data-incrementid="${product._id}"><i class="bi bi-plus "></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return template
}
export const subtotal = (array) => {
    let sumatoria = 0
    for (let product of array) {
        sumatoria += product.precio * product.item
    }
    return "$" + sumatoria
}
export const quantity = (array) => {
    let quantity = 0;
    for(let product of array){
        quantity += product.item;
    }
    return quantity
}
export const renderCartBadge = (array) => {
    document.getElementById("cartProductBadge").innerText = quantity(array) > 99 ? "99+" : quantity(array).toString();
}