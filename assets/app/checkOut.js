import { data } from "../modules/utils.js"
const productCost = document.getElementById('productsCost')
 const shippingCost= document.getElementById('shippingCost')
 const taxesCost= document.getElementById('taxes')
 const totalCompra = document.getElementById('total')
 let todasLasCartas= data;
 
            localStorage.setItem('compras', JSON.stringify(todasLasCartas))    
          

 let compras = JSON.parse(localStorage.getItem('compras')) || []
 totalPoductos()

function totalPoductos(){
  let sumatoriaTotal=0
  let shipping= 1550

for(let compra of compras){

  sumatoriaTotal+=compra.item * compra.precio
  let taxes= compra.precio * 0.21
  productCost.innerText=sumatoriaTotal
shippingCost.innerText = shipping
taxesCost.innerText= taxes
totalCompra.innerText= sumatoriaTotal + shipping + taxes
}

}
const order = document.getElementById("makeAnOrder")


order.addEventListener('click', (e)=>{
  e.preventDefault()
  Swal.fire(
      'Good job!',
      'Your inquiry was successfully sent!',
      'success',
  )
   setTimeout(function(){
    window.history.back();
   }, 2000)
})