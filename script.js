let productosCarrito = []

let valores = JSON.parse(localStorage.getItem('carrito'));
console.log(valores)

let menos = document.querySelectorAll(".cant_btn_menos");
let mas = document.querySelectorAll(".cant_btn_mas");

for (let btnMenos of menos) {
  btnMenos.addEventListener("click", restar);
}
for (let btnMas of mas) {
  btnMas.addEventListener("click", sumar);
}

function restar(e) {
  let botonTocado = e.target;
  let input = botonTocado.parentElement.children[1];
  let valorCampo = input.value;
  if (parseInt(valorCampo) > 1) {
    valorCampo = parseInt(valorCampo) - 1;
    input.value = valorCampo;
  }
}

function sumar(e) {
  let botonTocado = e.target;
  let input = botonTocado.parentElement.children[1];
  let valorCampo = input.value;
  valorCampo = parseInt(valorCampo) + 1;
  input.value = valorCampo;
}

function total (a,b){
    return a * b
}

let agregar = document.querySelectorAll(".btn_carrito");

for (let n of agregar) n.addEventListener("click", btnAgregar);

let valorCarrito = []



function btnAgregar(e) {
  let elemento = e.target;
  let btn = elemento.parentElement.children[4];
  let prod = elemento.parentElement.children[0].innerText;
  let valorPrecio = elemento.parentElement.children[1].innerText;
  let cantidad = parseInt(elemento.parentElement.children[3].children[1].value);
  let precio = valorPrecio.slice(1);
  let totalPrecio = total(cantidad,precio);

  let $producto = {"nombre":prod, "cantidad":cantidad,"total":totalPrecio}
  productosCarrito.push($producto);

  let divProducto = document.createElement('div');
  let divBorrar = document.createElement('div');
  let totalAPagar = document.getElementById('totalAPagar')
  let nodeProd = document.createElement('p');
  let nodeCant = document.createElement('input');
  let nodeTotal = document.createElement('p');
  let boton = document.createElement('button');
  let textoBoton = document.createTextNode('borrar')
  boton.appendChild(textoBoton);
  boton.className = 'borrar';
  divProducto.className = 'detalleItemCarro';
  divBorrar.className = 'divBorrar';
  nodeProd.className = 'producto';
  nodeCant.className = 'cant_input';
  nodeCant.type = 'number';
  nodeCant.value = cantidad;
  nodeTotal.className = 'total';
  nodeProd.appendChild(document.createTextNode($producto.nombre));
  nodeCant.appendChild(document.createTextNode($producto.cantidad));
  nodeTotal.appendChild(document.createTextNode($producto.total));
  divBorrar.appendChild(boton)
  divProducto.append(nodeProd,nodeCant,nodeTotal,divBorrar);

  let carritoJSON = JSON.stringify (productosCarrito);
  localStorage.setItem("carrito",carritoJSON);
  let valores = JSON.parse(localStorage.getItem('carrito'));

valorCarrito = []  
for (let n of valores){
  valorCarrito.push(n.total)
}
  let precioCarrito = valorCarrito.reduce((a,b)=>{return a + b},0)

  document.querySelector('.itemCarro').appendChild(divProducto);
  totalAPagar.innerHTML = 'Total: $'+precioCarrito 
  console.log(precioCarrito)
  
  /*let $nuevoProducto = document.innerText ='<div class="detalleItemCarro"><p class="producto">'+$producto.nombre+'</p><p class="cantidad">'+$producto.cantidad+'</p><p class="total">'+$producto.total+'</p></div>'
  console.log($nuevoProducto)
  document.querySelector('itemCarro').appendChild($nuevoProducto)*/
  
}
