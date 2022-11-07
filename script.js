let productosCarrito = [];
let valorCarrito = [];

//CHEQUEA EL LOCAL STORAGE SI HAY UN CARRITO ARMADO Y LO CARGA
function actualizarCarro() {
  let valores = JSON.parse(localStorage.getItem("carrito"));
  if (valores != null) {
    for (let n of valores) {
      productosCarrito.push(n);
      let nuevoRow = document.createElement("tr");
      let prodTableData = document.createElement("td");
      let cantTableData = document.createElement("td");
      let impTableData = document.createElement("td");
      let btnTableData = document.createElement("td");
      let totalAPagar = document.getElementById("totalAPagar");
      let nodeCant = document.createElement("input");
      let boton = document.createElement("img");

      prodTableData.className = "producto";
      prodTableData.appendChild(document.createTextNode(n.nombre));

      cantTableData.className = "valores";
      impTableData.className = "valores";
      nodeCant.className = "cant_input_carro";
      nodeCant.type = "number";
      nodeCant.value = n.cantidad;
      cantTableData.appendChild(nodeCant);

      impTableData.appendChild(document.createTextNode("$" + n.total));

      boton.className = "borrarItem";
      boton.src = "img/x-square.svg";
      btnTableData.appendChild(boton);
      btnTableData.className = "colBorrar";

      nuevoRow.className = "productoRowTabla";

      nuevoRow.append(prodTableData, cantTableData, impTableData, btnTableData);
      valorCarrito = [];
      for (let n of valores) {
        valorCarrito.push(n.total);
      }
      let precioCarrito = valorCarrito.reduce((a, b) => {
        return a + b;
      }, 0);

      document.querySelector(".detalleItemCarro").appendChild(nuevoRow);
      totalAPagar.innerHTML = "Total: $" + precioCarrito;
    }
  }
}
actualizarCarro();

let valoresInputs = document.querySelectorAll(".cant_input_carro");
for (let valInputs of valoresInputs) {
  valInputs.addEventListener("change", chequearInput);
}
function chequearInput(e) {
  let tecla = parseInt(e.target.value);
  if (tecla <= 0) {
    let alerta = document.getElementById("alerta");
    alerta.className = "alerta";
    alerta.innerHTML = "<p>Debe colocar un valor mayor a cero</p>";
  } else {
    console.log(productosCarrito)
    let lineaTarget = e.target.parentElement.parentElement.children[0].innerText;
    let productoSeleccionado = lineaTarget.toLowerCase();
    for (let items of productos) {      
      if (items.nombre == productoSeleccionado) {
        let pUnitario = items.precio;
        for (let x of productosCarrito) {
          if (x.nombre == lineaTarget) {
            x.cantidad = e.target.value;
            x.total = total(e.target.value, pUnitario);

            localStorage.clear();
            let carritoJSON = JSON.stringify(productosCarrito);
            localStorage.setItem("carrito", carritoJSON);
            let elem = document.querySelectorAll(".productoRowTabla");
            let valori = elem.length - 1;
            for (let i = valori; i >= 0; i--) {
              elem[i].parentNode.removeChild(elem[i]);
            }
            productosCarrito = [];
            actualizarCarro();
            document.location.reload();
            break;
          }
        }
      }
      

    }
  }
}

//BOTONES + Y - DE CADA PRODUCTO
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

function total(a, b) {
  return a * b;
}

let agregar = document.querySelectorAll(".btn_carrito");

for (let n of agregar) {
  n.addEventListener("click", btnAgregar);
}

function chequearProd(val) {
  for (let x of productosCarrito) {
    if (x.nombre == val) {
      return true;
      break;
    }
  }
}

function btnAgregar(e) {
  let elemento = e.target;
  let prod = elemento.parentElement.children[0].innerText;
  let valorPrecio = elemento.parentElement.children[1].innerText;
  let cantidad = parseInt(elemento.parentElement.children[3].children[1].value);
  let precio = valorPrecio.slice(1);
  let totalPrecio = total(cantidad, precio);

  //SI EL PRODUCTO ESTA EN EL CARRITO
  if (chequearProd(prod)) {
    for (let x of productosCarrito) {
      if (x.nombre == prod) {
        x.cantidad += cantidad;
        x.total = total(x.cantidad, precio);
        localStorage.clear();
        let carritoJSON = JSON.stringify(productosCarrito);
        localStorage.setItem("carrito", carritoJSON);
        let elem = document.querySelectorAll(".productoRowTabla");
        let valori = elem.length - 1;
        for (let i = valori; i >= 0; i--) {
          elem[i].parentNode.removeChild(elem[i]);
        }
        productosCarrito = [];
        actualizarCarro();
        document.location.reload();
        break;
      }
    }
  } else {
    let $producto = { nombre: prod, cantidad: cantidad, total: totalPrecio };
    productosCarrito.push($producto);

    let nuevoRow = document.createElement("tr");
    let prodTableData = document.createElement("td");
    let cantTableData = document.createElement("td");
    let impTableData = document.createElement("td");
    let btnTableData = document.createElement("td");
    let totalAPagar = document.getElementById("totalAPagar");
    let nodeCant = document.createElement("input");
    let boton = document.createElement("img");

    prodTableData.className = "producto";
    prodTableData.appendChild(document.createTextNode($producto.nombre));

    cantTableData.className = "valores";
    impTableData.className = "valores";
    nodeCant.className = "cant_input_carro";
    nodeCant.type = "number";
    nodeCant.value = $producto.cantidad;
    cantTableData.appendChild(nodeCant);

    impTableData.appendChild(document.createTextNode("$" + $producto.total));

    boton.className = "borrarItem";
    boton.src = "img/x-square.svg";
    btnTableData.appendChild(boton);
    btnTableData.className = "colBorrar";

    nuevoRow.className = "productoRowTabla";

    nuevoRow.append(prodTableData, cantTableData, impTableData, btnTableData);

    let carritoJSON = JSON.stringify(productosCarrito);
    localStorage.setItem("carrito", carritoJSON);
    let valores = JSON.parse(localStorage.getItem("carrito"));

    valorCarrito = [];
    for (let n of valores) {
      valorCarrito.push($producto.total);
    }
    precioCarrito = valorCarrito.reduce((a, b) => {
      return a + b;
    }, 0);

    document.querySelector(".detalleItemCarro").appendChild(nuevoRow);
    totalAPagar.innerHTML = "Total: $" + precioCarrito;
    document.location.reload();
  }
}

let borrarItem = document.querySelectorAll(".borrarItem");
for (let b of borrarItem) {
  b.addEventListener("click", quitarItem);
}

function quitarItem(e) {
  let elemento = e.target;
  let prodParaBorrar =
    elemento.parentElement.parentElement.children[0].innerText;

  for (let x in productosCarrito) {
    if (productosCarrito[x].nombre == prodParaBorrar) {
      productosCarrito.splice(x, 1);
    }
  }
  localStorage.clear();
  let carritoJSON = JSON.stringify(productosCarrito);
  localStorage.setItem("carrito", carritoJSON);
  let elem = document.querySelectorAll(".productoRowTabla");
  let valori = elem.length - 1;
  for (let i = valori; i >= 0; i--) {
    elem[i].parentNode.removeChild(elem[i]);
  }
  productosCarrito = [];
  actualizarCarro();
  document.location.reload();
}

let limpiarCarrito = document.getElementById("vaciarCarrito");
limpiarCarrito.addEventListener("click", () => {
  localStorage.clear();
  productosCarrito = [];
  actualizarCarro();
  document.location.reload();
});
