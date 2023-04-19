import { clearItemsLS } from "../modules/localStorage.js";
const productCost = document.getElementById('productsCost')
const shippingCost = document.getElementById('shippingCost')
const taxesCost = document.getElementById('taxes')
const totalCompra = document.getElementById('total')
let compras = JSON.parse(localStorage.getItem('compras')) || []
totalPoductos()

function totalPoductos() {
  let sumatoriaTotal = 0
  let shipping = 1550

  for (let compra of compras) {

    sumatoriaTotal += compra.item * compra.precio
    let taxes = compra.precio * 0.21
    let shipping = compra.precio * 0.1
    productCost.innerText = `$${sumatoriaTotal}`
    shippingCost.innerText = `$${shipping}`
    taxesCost.innerText = `$${taxes}` 
    totalCompra.innerText =`$${sumatoriaTotal + shipping + taxes}` 
  }

}
const order = document.getElementById("form")


order.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e);
  Swal.fire(
    'Good job!',
    'your purchase was processed',
    'success',
  ).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      clearItemsLS("compras");
      window.history.back();
    } else if (result.isDenied) {
      console.log("denied")
    }
  })
})
  