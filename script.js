let productosJSON;
let vegetales = [];
let arrayDeProducto = [];

fetch("productos.json")
  .then((response) => response.json())
  //await localStorage.setItem("listaProductos", JSON.stringify(res));
  .then((datos) => {
    productosJSON = datos;
    for (let n of datos) {
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

    arrayDeProducto.forEach((producto) => {
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
    });
   
    
    botonesMasMenos();
    agregaProducto();


  });

let productosCarrito = [];
let valorCarrito = [];

actualizarCarro();
//CHEQUEA EL LOCAL STORAGE SI HAY UN CARRITO ARMADO Y LO CARGA
function actualizarCarro() {
  let valores = JSON.parse(localStorage.getItem("carrito"));
  if (valores != null) {
    for (let n of valores) {
      productosCarrito.push(n);
      let tableBody = document.getElementById("tbody");
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

      document.querySelector(".tbody").appendChild(nuevoRow);
      totalAPagar.innerHTML = "Total: $" + precioCarrito;

      let borrarItem = document.querySelectorAll(".borrarItem");
      for (let b of borrarItem) {
        b.addEventListener("click", quitarItem);
      }

      let valoresInputs = document.querySelectorAll(".cant_input_carro");
      for (let valInputs of valoresInputs) {
        valInputs.addEventListener("change", chequearInput);
      }
      let valoresInputs2 = document.querySelectorAll(".cant_input");
      for (let valInputs of valoresInputs2) {
        valInputs.addEventListener("change", chequearInput2);
      }
    }
  }
}
//--CHEQUEAR INPUT--


  function chequearInput(e) {
    let tecla = parseInt(e.target.value);
    if (tecla <= 0) {
      let alerta = document.getElementById("alerta");
      alerta.className = "alerta";
      alerta.innerHTML = "<p>Debe colocar un valor mayor a cero</p>";
    } else {
      alerta.className = "";
      alerta.innerHTML = "";
      let lineaTarget =
        e.target.parentElement.parentElement.children[0].innerText;
      let productoSeleccionado = lineaTarget.toLowerCase();
      for (let items of arrayDeProducto) {
        if (items.nombre == productoSeleccionado) {
          let pUnitario = items.precio;
          for (let x of productosCarrito) {
            if (x.nombre == lineaTarget) {
              x.cantidad = e.target.value;
              x.total = total(e.target.value, pUnitario);

              localStorage.removeItem("carrito");
              let carritoJSON = JSON.stringify(productosCarrito);
              localStorage.setItem("carrito", carritoJSON);

              let elem = document.getElementById("tbody");
              elem.innerHTML = "";

              productosCarrito = [];
              actualizarCarro();
            }
          }
        }
      }
    }
  }


  function chequearInput2(e) {
    let tecla = parseInt(e.target.value);
    if (tecla <= 0) {
      let alerta = document.getElementById("alerta");
      alerta.className = "alerta";
      alerta.innerHTML = "<p>Debe colocar un valor mayor a cero</p>";
    } else {
      alerta.className = "";
      alerta.innerHTML = "";
    }
  }


function botonesMasMenos() {

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
}

function total(a, b) {
  return a * b;
}

function agregaProducto() {
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
    e.preventDefault();
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

          Toastify({
            text: `Se agregó ${cantidad} ${prod}`,
            duration: 2500,
            gravity: "bottom",
            style: {
              background: "linear-gradient(0deg, #002c00, #56ab2f)",
            },
          }).showToast();

          localStorage.removeItem("carrito");
          let carritoJSON = JSON.stringify(productosCarrito);
          localStorage.setItem("carrito", carritoJSON);
          let elem = document.getElementById("tbody");
          elem.innerHTML = "";

          productosCarrito = [];
          actualizarCarro();
        }
      }
    } else {
      let $producto = {
        nombre: prod,
        cantidad: cantidad,
        total: totalPrecio,
      };
      productosCarrito.push($producto);
      let tableBody = document.getElementById("tbody");
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

      Toastify({
        text: `Se agregó ${cantidad} ${prod}`,
        duration: 2500,
        gravity: "bottom",
        style: {
          background: "linear-gradient(0deg, #002c00, #56ab2f)",
        },
      }).showToast();

      let carritoJSON = JSON.stringify(productosCarrito);
      localStorage.setItem("carrito", carritoJSON);
      let valores = JSON.parse(localStorage.getItem("carrito"));

      let elem = document.getElementById("tbody");
      elem.innerHTML = "";

      valorCarrito = [];
      for (let n of productosCarrito) {
        valorCarrito.push(n.total);
      }
      precioCarrito = valorCarrito.reduce((a, b) => {
        return a + b;
      }, 0);

      totalAPagar.innerHTML = "Total: $" + precioCarrito;
      productosCarrito = [];
      actualizarCarro();
    }
  }
}

function quitarItem(e) {
  e.preventDefault();
  let elemento = e.target.parentNode.parentNode;
  elemento.remove();
  let prodParaBorrar = elemento.children[0].innerText;

  for (let x in productosCarrito) {
    if (productosCarrito[x].nombre == prodParaBorrar) {
      productosCarrito.splice(x, 1);
    }
  }

  localStorage.removeItem("carrito");
  let carritoJSON = JSON.stringify(productosCarrito);
  localStorage.setItem("carrito", carritoJSON);

  let elem = document.getElementById("tbody");
  elem.innerHTML = "";

  let valores = JSON.parse(localStorage.getItem("carrito"));

  valorCarrito = [];
  for (let n of valores) {
    valorCarrito.push(n.total);
  }
  precioCarrito = valorCarrito.reduce((a, b) => {
    return a + b;
  }, 0);
  let totalAPagar = document.getElementById("totalAPagar");
  totalAPagar.innerHTML = "Total: $" + precioCarrito;

  productosCarrito = [];
  actualizarCarro();
}

let limpiarCarrito = document.getElementById("vaciarCarrito");
limpiarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("carrito");
  productosCarrito = [];
  let elem = document.getElementById("tbody");
  elem.innerHTML = "";
  let totalAPagar = document.getElementById("totalAPagar");
  totalAPagar.innerHTML = "Total: $0";
});
