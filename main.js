let productos = [
    {id: 1 ,foto: "pc1.webp", nombre:"Pc - 1" , precio:190000, cantidad:"1"},
    {id: 2 , foto: "pc2.jpg", nombre:"Pc - 2" , precio:180000, cantidad:"1"},
    {id:3 , foto: "pc3.webp", nombre:"Pc - 3" , precio:200000, cantidad:"1"},
    {id: 4 , foto: "pc4.jpg", nombre:"Pc - 4" , precio:250000, cantidad:"1"},
]

let carrito;

let carritoLS = localStorage.getItem("productos");

if (carritoLS) {
    carrito = JSON.parse(carritoLS);

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
    
    localStorage.setItem("productos", JSON.stringify(carrito));
    
    location.reload()
     
}
          


function mostrar_carrito(){

    let tabla = document.getElementById("tbody");
    tabla.innerHTML = ""
    
    for(let producto of carrito){
        let fila = document.createElement("tr");
        
             fila.innerHTML = 
             `
             <td><img src = "${producto.foto}"</img></td>
             <td><p>${producto.nombre}</p></td>
             <td><p>${producto.cantidad}</p></td>
             <td><p>$ ${producto.precio}</p></td>
             <td><button class = "btn btn-danger borrar_item" id = "${producto.id}">Borrar</button></td>
             `
             tabla.append(fila)
    
             function calcular_total(acu , producto){
                 
                 acu = acu + (producto.precio*producto.cantidad);
                 return acu
                 
                }
                let total = document.getElementById("total");
                let venta_total = carrito.reduce(calcular_total , 0)
                total.innerHTML = `
                
                <h3>Total: $ ${venta_total} </h3>
                
                `
                let btn_borrar = document.querySelectorAll(".borrar_item");
                
                for(let btn of btn_borrar){
                    btn.addEventListener("click", borrar_item)
                }
                
            }
}
    
    
mostrar_carrito()
    
    function vaciar_carrito (){
        localStorage.clear();
        location.reload();
    
     }


function borrar_item(e){
    let id_btn = e.currentTarget.id
    let index = carrito.findIndex(producto => producto.id == id_btn);
    carrito.splice(index, 1);
    mostrar_carrito()
    localStorage.setItem("productos", JSON.stringify(carrito))
    location.reload()

}


let btn_agregar = document.querySelectorAll(".btn_agregar");
for(let btn of btn_agregar){

    btn.addEventListener("click", agregar_carrito);
}

let btn_vaciar = document.querySelectorAll(".btn_vaciar");

for(let btn of btn_vaciar){
    btn.addEventListener("click", vaciar_carrito);
}



