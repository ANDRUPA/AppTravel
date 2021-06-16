document.addEventListener("DOMContentLoaded", async () => {
  /*
 *
 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="tour-block">
                        <div class="tour-img">
                            <a href="#"><img src="images/tour-pic-5.jpg"
                                    alt="Tour and Travel Agency - Responsive Website Template"></a>
                        </div>
                        <div class="tour-content">
                            <h2><a href="#" class="title">Paquete 1</a></h2>
                            <div class="tour-meta"> <span class="tour-meta-icon"><i class="fa fa-sun-o"></i></span><span
                                    class="tour-meta-text">5 Days</span> <span class="tour-meta-text">|</span> <span
                                    class="tour-meta-icon"><i class="fa fa-moon-o"></i></span><span
                                    class="tour-meta-text">4 Nights </span> </div>
                            <div class="tour-text mb40">
                                <p>Hotel: </br>
                                    Regimen de comida: </br>
                                    Descripcion de la estadia: </br>
                                </p>
                            </div>
                            <div class="tour-details">
                                <div class="tour-details-text"><span>$ 2000</span></div>
                                <div class="tour-details-btn"> <span><a href="#"
                                            class="btn btn-primary">Comprar</a></span> </div>
                            </div>
                        </div>
                    </div>
                </div> 
 * 
 * 
 */

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const paquetesResponse = await fetch("http://localhost:3000/paquetes", {
    method: "GET",
    headers,
  });

  const paquetes = await paquetesResponse.json();

  pintarPaquetes(paquetes);
});

function pintarPaquetes(paquetes) {
  const containerPaquetes = document.querySelector(".row.containerPaquetes");

  const templatesPaquetes = paquetes
    .map((paq) => {
      return `
        
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="tour-block">
                        <div class="tour-img">
                            <a href="#"><img src="${
                              paq.imagen_paquetes.length > 0
                                ? paq.imagen_paquetes[0]["url"]
                                : "https://via.placeholder.com/728x90.png?text=NOIMAGENDISPONIBLE"
                            }"
                                    alt="${paq.descripcion}"></a>
                        </div>
                        <div class="tour-content">
                            <h2><a href="#" class="title">${
                              paq.destino
                            }</a></h2>
                            <div class="tour-meta"> <span class="tour-meta-icon"><i class="fa fa-sun-o"></i></span><span
                                    class="tour-meta-text">${
                                      paq.duracion
                                    } Days</span> <span class="tour-meta-text">|</span> <span
                                    class="tour-meta-icon"><i class="fa fa-moon-o"></i></span><span
                                    class="tour-meta-text">${
                                      paq.duracion - 1
                                    } Nights </span> </div>
                            <div class="tour-text mb40">
                                <p>Hotel: </br>
                                    Regimen de comida: ${paq.comidas}  </br>
                                    Descripcion de la estadia: ${
                                      paq.alojamiento
                                    } </br>
                                </p>
                            </div>
                            <div class="tour-details">
                                
                            
                                <div class="tour-details-dates">
                                <span>Selecciones Cantidad de paquetes:</span>  
                                <input min = "1" max="4" type="number" class="cantidadPaquetes"/> 
                                <br/>
                                <br/>
                                <span>Seleccione fecha de viaje:</span>   
                                    <select class="fechaSeleccion">
                                    ${paq.fecha_paquetes
                                      .map(({ fecha, id }) => {
                                        return `<option value = ${id}>${fecha}</option>`;
                                      })
                                      .join()}
                                    </select>
                                    <br/>
                                    <br/>
                                
                                </div>

                                <div class="tour-details-text"><span>$ ${
                                  paq.precio
                                }</span></div>


                                <div class="tour-details-btn"> <span><a href="#" data-paquete-id = ${
                                  paq.id
                                } class="btn btn-primary botonComprar" >Comprar</a></span> </div>
                            </div>
                        </div>
                    </div>
                </div> 
        `;
    })
    .join("");

  containerPaquetes.innerHTML = templatesPaquetes;

  const botonesComprar = document.querySelectorAll(".botonComprar");

  const comprarHanlder = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const botonOprimido = ev.target;
    const idPaquete = botonOprimido.getAttribute("data-paquete-id");
    const cantidadPaquetes = botonOprimido
      .closest(".tour-details")
      .querySelector(".cantidadPaquetes").value;
    const idFechaSeleccionada = botonOprimido
      .closest(".tour-details")
      .querySelector(".fechaSeleccion").value;
    const paqueteSeleccionado = paquetes.find(
      (paquete) => paquete.id == idPaquete
    );

    const paqueteCarrito = {
      idPaquete,
      paqueteSeleccionado,
      idFechaSeleccionada,
      cantidadPaquetes,
    };

    if (localStorage.getItem("carrito") == null) {
      localStorage.setItem("carrito", JSON.stringify([]));
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito"));

    carritoActual.push(paqueteCarrito);

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    location.href = "carrito.html";
  };

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", comprarHanlder);
  });
}
