//localStorage.removeItem('listaProductos')
let productosTodos = fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    let valoresLocal = localStorage.setItem("listaProductos", JSON.stringify(data));
    console.log(valoresLocal)
});

/*fetch('productos.json')
    .then(response => response.json())
    .then(data => {*/

/*let productosJSON = JSON.parse(localStorage.getItem("listaProductos"));

let vegetales = [];
let arrayDeProducto = [];

for (let n of productosJSON) {
  vegetales.push(n.nombre);
}
vegetales.sort();
for (let x of vegetales) {
  for (let y of productosJSON) {
    if (y.nombre == x) {
      arrayDeProducto.push(y);
      break;
    }
  }
}
console.log(arrayDeProducto)
arrayDeProducto.forEach((producto) => {
  console.log(producto.nombre,producto.precio)  
  let elemento = document.createElement("div");
  elemento.className = "cardProducto";
  elemento.innerHTML = `${producto.imagen}
            <div class="descProducto">
                    <h5>${producto.nombre}</h5>
                    <h2>$${producto.precio}</h2>
                    <p>precio por unidad</p>

                    <div class="cont_btns">
                        <button class="cant_btn_menos">-</button>
                        <input class="cant_input" type="number" value=1>
                        <button class="cant_btn_mas">+</button>
                    </div>
                    <button class="btn_carrito">agregar</button>
                </div>`;
  let seccion = document.getElementById("contenedorProductos");

  seccion.append(elemento);
});*/

