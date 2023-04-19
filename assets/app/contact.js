import { renderCartBadge } from "../modules/cartLogic.js";
import { getItemsLS } from "../modules/localStorage.js";
const $form = document.getElementById("form")
renderCartBadge(getItemsLS('compras'))
$form.addEventListener('submit', (e)=>{
    e.preventDefault()
    Swal.fire(
        'Good job!',
        'Your inquiry was successfully sent!',
        'success',      
    )
    $form.reset()
})




