document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito") == null) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }

  const carroElement = document.getElementById("carro");
  const arrayCarrito = JSON.parse(localStorage.getItem("carrito"));

  const elementosCarro = arrayCarrito.map((paqueteCarrito) => {
    const contenedorElemento = document.createElement("div");
    contenedorElemento.classList.add("itemCarro");
    contenedorElemento.innerHTML = `
    <img id="imgItemCarro" src="${
      paqueteCarrito.paqueteSeleccionado.imagen_paquetes[0].url
    }" alt="">
    <div id="infoPaqueteCarrito">
    <h3 id="tituloPaqueteComprado"> ${
      paqueteCarrito.paqueteSeleccionado.descripcion
    }</h3>
    <p id="destinoPaquete">${paqueteCarrito.paqueteSeleccionado.destino}</p>
    <p id="duracionDiasPaquete">${
      paqueteCarrito.paqueteSeleccionado.duracion
    } dias</p>
    <p id="duracionNochesPaquete">${
      paqueteCarrito.paqueteSeleccionado.duracion - 1
    } noches</p>
    <p id="comidaPaquete">${paqueteCarrito.paqueteSeleccionado.comidas}</p>
    </div>
    <div id="catidadYPrecio">
    <button id="botonReducir" onlcick="restar()" type="button">-</button>
    <p value="" id="cantidadPaquete">${paqueteCarrito.cantidadPaquetes}</p>
    <button id="botonSumar" onclick="sumar()" type="button">+</button>
    <p value="" id="precioPaquete">${
      paqueteCarrito.cantidadPaquetes *
      paqueteCarrito.paqueteSeleccionado.precio
    }</p>
    </div>`;

    return contenedorElemento;
  });

  elementosCarro.forEach((element) => {
    carroElement.appendChild(element);
  });

  function sumar() {
    cantidadPaquete.value++;
  }

  function restar() {
    cantidadPaquete.value--;
  }
});
