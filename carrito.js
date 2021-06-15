let carro = document.getElementById("carro");
let arrayCarrito = [];
let contador = 0;
let paqueteEnCarro = document.getElementsByClassName("col-lg-6 col-md-6 col-sm-6 col-xs-12");

function comprar(funcionComprar) {
    //deberia pushear un id o algo al arrayCarrito, cargar dicho array al localstorage y pintar los elementos del array en cargarCarro
}



function cargarCarro() {
    carro.innerHTML += `
<div class="itemCarro">
<img id="imgItemCarro" src="" alt="">
<div id="infoPaqueteCarrito">
<h3 id="tituloPaqueteComprado"></h3>
<p id="destinoPaquete"></p>
<p id="duracionDiasPaquete"></p>
<p id="duracionNochesPaquete"></p>
<p id="comidaPaquete"></p>
</div>
<div id="catidadYPrecio">
<button id="botonReducir" onlcick="restar()" type="button">-</button>
<p value="${contador + 1}" id="cantidadPaquete">${cantidadPaquete.value}</p>
<button id="botonSumar" onclick="sumar()" type="button">+</button>
<p value="${}" id="precioPaquete">${cantidadPaquete.value * precioPaquete.value}</p>
</div>
</div>
`;
}

function sumar() {
    cantidadPaquete.value++;
}

function restar() {
    cantidadPaquete.value--;
}

