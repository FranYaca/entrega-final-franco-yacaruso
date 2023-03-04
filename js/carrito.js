    let carrito = localStorage.getItem("productos");
    carrito = JSON.parse(carrito);
function mostrar_carrito(){
    if(carrito && carrito.length > 0){ 

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

function comprar(){
    Swal.fire({
        title: 'Compra exitosa',
        text: 'Muchas gracias por su compra',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })
      .then (vaciar_carrito)


}

let btn_vaciar = document.querySelectorAll(".btn_vaciar");

for(let btn of btn_vaciar){
    btn.addEventListener("click", vaciar_carrito);
}

let btn_comprar = document.querySelectorAll(".btn_comprar");

for(let btn of btn_comprar){
    btn.addEventListener("click", comprar);
}