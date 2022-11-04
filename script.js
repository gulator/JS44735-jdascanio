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

function btnAgregar(e) {
  let elemento = e.target;
  let btn = elemento.parentElement.children[4];
  let prod = elemento.parentElement.children[0].innerText;
  let valorPrecio = elemento.parentElement.children[1].innerText;
  let cantidad = parseInt(elemento.parentElement.children[3].children[1].value);
  let precio = valorPrecio.slice(1);
  console.log(elemento.parentElement.parentElement.children[0].src)
}
