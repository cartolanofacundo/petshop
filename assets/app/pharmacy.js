import { createItemsLS, getItemsLS, incrementItemLS, decrementItemLS, clearItemsLS } from "../modules/localStorage.js";
import { filterProducts } from "../modules/filterLogic.js";
import { renderCards } from "../modules/productsLogic.js";
import { renderCart, renderCartBadge } from "../modules/cartLogic.js";
const $buscador = document.getElementById('searchBar')
let $cartContainer = document.getElementById("cartProductsContainer")
let $cartButton = document.getElementById("cartButton");
let $productCardsContainer = document.getElementById('productsContainer')
let $cartRemoveAll = document.getElementById("removeAllButton")
let $modalCont = document.getElementById("productModal")
let pharmacyProducts = []
let favorites = []
let compras = []


let products;
fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then(data => data.json())
    .then(response => {
        products = response
        pharmacyProducts = products.filter(producto => producto.categoria == "farmacia")
        renderCards(pharmacyProducts, $productCardsContainer)
        
        favorites = getItemsLS('favoritos')
        compras = getItemsLS('compras')
        
    })
    .catch(err => console.log(err))
    renderCartBadge(getItemsLS('compras'))

document.getElementById("searchBar").addEventListener("keyup", (e) => {
    e.preventDefault()
    const selectedFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
    const filterString = $buscador.value
    let products = filterProducts(filterString, pharmacyProducts, selectedFilters);
    renderCards(products, $productCardsContainer)
})
document.getElementById("checkboxContainer").addEventListener("change", (e) => {
    e.preventDefault()
    const selectedFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
    const filterString = $buscador.value
    let products = filterProducts(filterString, pharmacyProducts, selectedFilters);
    renderCards(products, $productCardsContainer)
})

function filtrar(array){
    const selectedFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
    const filterString = $buscador.value
    let products = filterProducts(filterString, array, selectedFilters);
    return products
}

export const addToCart = (e) => {
    const compid = e.target.dataset.compid
    if (compid) {

        const compraExist = compras.some(comp => comp._id == compid)
        if (compraExist) {
            const aux = compras.filter(comp => comp._id != compid)
            compras = aux

        } else {
            const carts = products.find(comp => comp._id === compid)
            carts.item = 1;
            compras.push(carts)
        }

        createItemsLS('compras', compras)
        renderCards(filtrar(pharmacyProducts), $productCardsContainer)
        renderCartBadge(getItemsLS('compras'))
    }
}
export const addToFavorite = (e) => {
    const favid = e.target.dataset.favid
    if (favid) {

        const favoritoTrue = favorites.some(fav => fav._id == favid)
        if (favoritoTrue) {
            const aux = favorites.filter(fav => fav._id != favid)
            favorites = aux

        } else {
            const carts = products.find(carta => carta._id === favid)
            favorites.push(carts)
        }

        createItemsLS('favoritos', favorites)
        renderCards(filtrar(pharmacyProducts), $productCardsContainer)
    }
}
let incrementItems = (e) => {
    const incrementId = e.target.dataset.incrementid
    if (incrementId) {
         

        compras = incrementItemLS('compras', compras, incrementId )
        renderCards(filtrar(pharmacyProducts), $productCardsContainer)
        renderCart(compras,$cartContainer)
        renderCartBadge(compras)
    }
}
let decrementItems = (e) => {
    const decrementId = e.target.dataset.decrementid
    if (decrementId) {
        compras = decrementItemLS('compras', compras, decrementId )
        renderCards(filtrar(pharmacyProducts), $productCardsContainer)
        renderCart(compras, $cartContainer)
        renderCartBadge(compras)
    }
}

function removeAll() {
    compras = clearItemsLS('compras')
    renderCards(filtrar(pharmacyProducts), $productCardsContainer)
    renderCart(compras, $cartContainer)
    renderCartBadge(compras)
}
document.getElementById("productsContainer").addEventListener('click', addToFavorite)
document.getElementById("productsContainer").addEventListener("click", addToCart)
document.getElementById("productsContainer").addEventListener('click', incrementItems);
document.getElementById("productsContainer").addEventListener('click', decrementItems);
$cartContainer.addEventListener('click', incrementItems);
$cartContainer.addEventListener('click', decrementItems);
$cartButton.addEventListener('click', () => {
    renderCart(compras, $cartContainer)
    renderCartBadge(compras)
})
$cartRemoveAll.addEventListener("click", removeAll)



function imprimirModal(producto, container) {
    
        const modal = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-background">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row p-2 mb-3">
                            <div class="col-6">
                                <img src="${producto.imagen}" class="img-thumbnail" alt="">
                            </div>
                            <div class="col-6">
                                <div class="row mb-2">
                                    <span class="title-cart-product">${producto.producto}</span>
                                    <span class="category-cart-product">${producto.categoria}</span>
                                </div>
                                <div class="row mb-2 category-cart-product p-3">
                                    ${producto.descripcion}
                                </div>
                                <div class="row mb-2 p-1">
                                    <span class="category-cart-product">Price: $ ${producto.precio}</span>
                                </div>
                                <div class="row mb-2 p-1">
                                    <span class="category-cart-product">Stock: ${producto.disponibles}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    container.innerHTML = modal
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('see-more-link')) {
        const productId = event.target.getAttribute('data-id');
        const product = pharmacyProducts.find(item => item._id === productId);
        if (product) {
            imprimirModal(product, document.getElementById('productModal'));
        }
    }
});