let productos = [
    {id: 1 ,foto: "imagenes/pc1.webp", nombre:"Pc - 1" , precio:190000, cantidad:"1"},
    {id: 2 , foto: "imagenes/pc2.jpg", nombre:"Pc - 2" , precio:180000, cantidad:"1"},
    {id:3 , foto: "imagenes/pc3.webp", nombre:"Pc - 3" , precio:200000, cantidad:"1"},
    {id: 4 , foto: "imagenes/pc4.jpg", nombre:"Pc - 4" , precio:250000, cantidad:"1"},
]

const numerito = document.querySelector("#numerito")

let carrito;

let carritoLS = localStorage.getItem("productos");

if (carritoLS) {
    carrito = JSON.parse(carritoLS);
    actualizarNumerito();

} else {
    carrito = [];
}

function agregar_carrito (e){
    
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


    let nuevo_numerito = carrito.reduce((acc, producto) =>  acc + producto.cantidad, 0);
    console.log(nuevo_numerito)
    numerito.innerText = nuevo_numerito;

    }
          

let btn_agregar = document.querySelectorAll(".btn_agregar");
for(let btn of btn_agregar){

    btn.addEventListener("click", agregar_carrito);
}



