import { getItemsLS, decrementItemLS,incrementItemLS, clearItemsLS } from "../modules/localStorage.js";
import { renderCart, renderCartBadge } from "../modules/cartLogic.js";
let $cartContainer = document.getElementById("cartProductsContainer");
let $cartButton = document.getElementById("cartButton")
let $cartRemoveAll = document.getElementById("removeAllButton")
let $cartProductBadge = document.getElementById("cartProductBadge");
let compras = getItemsLS('compras')

export const incrementItems = (e) => {
    const incrementId = e.target.dataset.incrementid
    if (incrementId) {
        compras = incrementItemLS('compras', compras, incrementId )
        renderCart(compras,$cartContainer)
        renderCartBadge(compras)
    }
}
export const decrementItems = (e) => {
    const decrementId = e.target.dataset.decrementid
    console.log("click")
    console.log(e.target.dataset)
    if (decrementId) {
        console.log("entre")
        compras = decrementItemLS('compras', compras, decrementId )
        renderCart(compras, $cartContainer)
        renderCartBadge(compras)
    }
}
export const removeAll = () => {
    compras = clearItemsLS('compras')
    renderCart(compras, $cartContainer)
    renderCartBadge(compras);
}

$cartContainer.addEventListener('click', incrementItems);
$cartContainer.addEventListener('click', decrementItems);
$cartButton.addEventListener('click', () =>{
    renderCart(compras, $cartContainer)
    renderCartBadge(compras)
})
$cartRemoveAll.addEventListener("click", removeAll)