let productos = []
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
let numerito = document.querySelector("#numerito")
let contenedorProductos = document.querySelector("#contenedor");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let botonesCategorias = document.querySelectorAll(".btn_categoria");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div> 
         `;

        contenedorProductos.append(div);
    })

    botones_agregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

       if (e.currentTarget.id != "todos") {
            
            let productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            
            cargarProductos(productos);
        }

    })
});

function botones_agregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregar_carrito);
    });
}

let carrito;

let carritoLS = localStorage.getItem("productos");

if (carritoLS) {
    carrito = JSON.parse(carritoLS);
    actualizarNumerito();

} else {
    carrito = [];
}

function agregar_carrito (e){
    Toastify({

        text: "Producto agregado",
        gravity: "bottom",
        duration: 2000,
        position: "center"
        }).showToast();


    let btn_id = e.currentTarget.id;
    let producto_agregado = productos.find(producto => producto.id == btn_id);


    if(carrito.some(producto => producto.id == btn_id)) {
        let index = carrito.findIndex(producto => producto.id == btn_id);

        carrito[index].cantidad++;
    } else {
        producto_agregado.cantidad = "1";
        carrito.push(producto_agregado);
    }
    
    actualizarNumerito();

    localStorage.setItem("productos", JSON.stringify(carrito));
    

     
}
function actualizarNumerito() {


    let nuevo_numerito = carrito.reduce((acu, producto) =>  acu + producto.cantidad, 0);
    numerito.innerText = nuevo_numerito;

    }
          

let btn_agregar = document.querySelectorAll(".btn_agregar");
for(let btn of btn_agregar){

    btn.addEventListener("click", agregar_carrito);
}



