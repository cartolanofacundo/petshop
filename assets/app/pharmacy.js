import { createItemsLS, getItemsLS, incrementItemLS, decrementItemLS, clearItemsLS } from "../modules/localStorage.js";
import { filterProducts } from "../modules/filterLogic.js";
import { renderCards } from "../modules/productsLogic.js";
import { renderCart, renderCartBadge } from "../modules/cartLogic.js";
const $buscador = document.getElementById('searchBar')
let $cartContainer = document.getElementById("cartProductsContainer")
let $cartButton = document.getElementById("cartButton");
let $productCardsContainer = document.getElementById('productsContainer')
let $cartRemoveAll = document.getElementById("removeAllButton")
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
        renderCards(pharmacyProducts, $productCardsContainer)
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
        renderCards(pharmacyProducts, $productCardsContainer)
    }
}
let incrementItems = (e) => {
    const incrementId = e.target.dataset.incrementid
    if (incrementId) {
         

        compras = incrementItemLS('compras', compras, incrementId )
        renderCards(pharmacyProducts, $productCardsContainer)
        renderCart(compras,$cartContainer)
        renderCartBadge(compras)
    }
}
let decrementItems = (e) => {
    const decrementId = e.target.dataset.decrementid
    if (decrementId) {
        compras = decrementItemLS('compras', compras, decrementId )
        renderCards(pharmacyProducts, $productCardsContainer)
        renderCart(compras, $cartContainer)
        renderCartBadge(compras)
    }
}

function removeAll() {
    compras = clearItemsLS('compras')
    renderCards(pharmacyProducts, $productCardsContainer)
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
