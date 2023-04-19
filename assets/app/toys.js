const $buscador=document.getElementById('searchBar')
const $categoria1=document.getElementById('category1')
const $categoria2=document.getElementById('category2')
const $carrito = document.getElementById("cartProductsContainer")
const $remove = document.getElementById("removeAllButton")
const $subtot = document.getElementById("subtotalPrice")
const $monto = document.getElementById('montos')





let $template=document.getElementById('productsContainer')



let todasLasCartas;
fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(dat => dat.json())
            .then(respuesta => {
                todasLasCartas= respuesta 
                let jugueteria = todasLasCartas.filter(producto => producto.categoria == "jugueteria")
                
                crearCarta(jugueteria,$template)
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
let compras = JSON.parse(localStorage.getItem('compras')) || []
console.log(compras)
                


//funcion para guardar en local storage los elementos que fueron seleccionados como favoritos por el usuario
const funcionEvento = (e) => {
    const favid = e.target.dataset.favid
    if(favid){
        
        const favoritoTrue = favoritos.some(fav => fav._id == favid)
        if(favoritoTrue){
            const aux = favoritos.filter( fav => fav._id != favid )
            favoritos = aux

        } else{
            const carts = todasLasCartas.find( carta => carta._id === favid)
            favoritos.push(carts)
        }
        
        e.target.classList.toggle('btn-danger')
        console.log(favoritos)
        
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
    }
}

//funcion para guardar en local storage los elementos que fueron seleccionados por el usuario con el boton compras
const funcionEvento2 = (e) => {
    const compid = e.target.dataset.compid
    if(compid){
        
        const compraTrue  = compras.some(comp => comp._id == compid)
        if(compraTrue){
            const aux = compras.filter( comp => comp._id != compid )
            compras = aux

        } else{
            const carts = todasLasCartas.find( comp => comp._id === compid)
            carts.items = 1
            compras.push(carts)
        }
        
        e.target.classList.toggle('btn-danger')
        
        
        localStorage.setItem('compras', JSON.stringify(compras))
    }
    crearCartaCarrito(compras, $carrito)  
    renderSubtotal(); 
}
$template.addEventListener('click', funcionEvento)
$template.addEventListener('click', funcionEvento2)

//funcion para almacenar las cartas que el usuario selecciona con compras, dentro del carrito
function crearCartaCarrito(array, lugar) {
    const template = array.reduce((acc, act) => {
      return (acc + `
        <div class="offcanvas-body">
          <div class="card mb-3 ">
            <div class="row g-0 d-flex align-items-center px-2">
              <div class="col-md-4">
                <img src="${act.imagen}" style="width: 20px;" alt="imagen del producto" >
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${act.producto}</h5>
                  <div class="container-card d-flex justify-content-between align-items-end text-center">
                    <div class="btn-group me-2 align-items-center" role="group" aria-label="First group">
                      <button type="button" class="btn btn-outline-secondary" id="botonMenos" data-id="${act._id}" data-accion="restar">-</button>
                      <button type="button" class="btn btn-outline-secondary" id="botonInicial_${act._id}">${act.items}</button>
                      <button type="button" class="btn btn-outline-secondary" id="botonMas" data-id="${act._id}" data-accion="agregar">+</button>
                    </div>
                    <div class="price">
                      <span style="font-size: 12px !important;" class="text-muted">Subtotal:</span>
                      <span id="montos" style="font-size: 16px !important; font-weight: bold !important;">$${act.precio * act.items}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`);
    }, '');
    lugar.innerHTML = template;
}










//funcion para sumar 1 o restar 1 item al elemento ya seleccionado por el usuario
function modificarItem(id, accion){
    if(accion === "agregar"){
    for (const producto of compras) {
        if(producto._id === id && producto.items < producto.disponibles){
            producto.items ++
        }
        
    }

    } else{
        
        for (const producto of compras) {
            if(producto._id === id){
                
            if(producto.items <= 1){
                compras = compras.filter(productoCompras => productoCompras._id !== producto._id)
                break
            } else{
                producto.items --
            }
            
            }
        }
    }
    localStorage.setItem('compras', JSON.stringify(compras))
    crearCartaCarrito(compras, $carrito)
}
$carrito.addEventListener('click', (e)=> {
    const id = e.target.dataset.id
    const accion = e.target.dataset.accion
    modificarItem(id, accion)
    renderSubtotal();

})






 //escuchadores y filtros por categorias y busquedas !!!!IMPORTANTE REPARAR LOS FILTROS!!!!!
                
$categoria1.addEventListener('click', (e) => {
let men= menor(jugueteria,$categoria1.checked)
crearCarta(men,$template)
search (men,$buscador.value)

})

$categoria2.addEventListener('click', (e) => {
let may=mayor(jugueteria,$categoria2.checked)
crearCarta(may,$template)
search (may,$buscador.value)
})

$buscador.addEventListener('input', (e)=> {
    if($categoria1.checked){
    let me=menor(jugueteria,$categoria1.checked)
    let re = search (me,$buscador.value)
    crearCarta(re,$template)
}else if ($categoria2.checked){
    let ma=mayor(jugueteria,$categoria2.checked)
    let res = search (ma,$buscador.value)
    crearCarta(res,$template)
}else{
    let resultado = search (jugueteria,$buscador.value)
        crearCarta(resultado,$template)}
})

$remove.addEventListener('click', e =>{
    localStorage.removeItem('compras')
    compras = []
    crearCartaCarrito(compras, $carrito)
    renderSubtotal();
})
crearCartaCarrito(compras, $carrito)


function subtotal(array){
    let subtotal = 0
    for (const monto of array) {
        if(array.length === 0){
            return 0
        } else{ 
            subtotal += monto.precio * monto.items
        } 
    } return subtotal
}

renderSubtotal();

function renderSubtotal(){
    $subtot.innerHTML = subtotal(compras)
}


})
.catch(err => console.log(err))

//HASTA ACA LLEGA EL FECTH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function search(array,texto){
    if(!texto){
    return array
}else{ 
    let minuscula= texto.toLowerCase()
    let search=array.filter(e => e.producto.toLowerCase().includes(minuscula) )
    return search
}
//arreglar boton compras quede pintado 
//acomodar el carrito para agregar los elementos sin refrescar la pagina 
}

//funcion para crear cartas e imprimirlas 
function crearCarta(array, lugar) {
    const template = array.reduce((acc, act) => {
        let favid = act._id
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
        let btnClase = favoritos.some(fav => fav._id == favid) ? 'btn-danger' : ''
        let compid = act._id
        let compras = JSON.parse(localStorage.getItem('compras')) || []
        let btnClasedos = compras.some(comp => comp._id == compid) ? 'btn-danger' : ''
        return (acc + `
            <div class="col-2 card p-0 product-card shadow-sm rounded-5 mx-2 mb-2 ">
                <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger p-2">
                    ${act.disponibles == 0 ? `No hay en stock` : `Ultimos disponibles ${act.disponibles}`}
                </span>
                <div class="img-product-container rounded-top-5 overflow-hidden position-relative text-center p-3">
                    <div class="alert alert-danger position-absolute top-0 end-0 rounded-price" role="alert">
                        <p class="fs-4">$${act.precio}</p>
                    </div>
                    <img src=${act.imagen} class="card-img-top img-product rounded-5 w-100" alt="...">
                </div>
                <div class="card-body p-4">
                    <h5 class="card-title text-center fs-3">${act.producto}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-end">
                            <button class="btn d-flex align-items-center justify-content-center me-2 ${btnClase}" data-favid=${act._id}>favorito</button>
                            <button class="btn d-flex align-items-center justify-content-center me-2${btnClasedos}" data-compid=${act._id}>
                                compras
                            </button>
                        </div>
                        <a href="#" class="text-black">See more...</a>
                    </div>
                </div>
            </div>
        `);
    }, '');
    lugar.innerHTML = template
}



function menor(array,check){
    if(check){
        filtromenor=array.filter(carta => carta.precio <= 1600)
        return filtromenor
    }else{ 
        return array
        }
}
function mayor(array,check){
    if(check){
        filtromayor=array.filter(carta => carta.precio > 1600)
        return filtromayor
    }else{ 
        return array
        }
}

//renderiza subtotal 




