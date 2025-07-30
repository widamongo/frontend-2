//variables globales
const d= document;
let clienteInput= document.querySelector(".cliente");
let productoInput= d.querySelector(".producto");
let precioInput= d.querySelector(".precio");
let imagenInput= d.querySelector(".imagen");
let observacionInput= d.querySelector(".observacion");
let btnGuardar= d.querySelector(".btn-guardar");
let btnActualizar = d.querySelector(".btn-actualizar");
let tabla = d.querySelector(".table > tbody");
let posEditar = null; // nueva variable para rastrear el índice a editar

//agregar evento click al boton del formulario
btnGuardar.addEventListener("click", () => {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    if (datos != null){
      guardarDatos(datos);
    }
    borrarTabla(); // Limpiar la tabla antes de mostrar los datos
    mostrarDatos();
});

//fusnsion para validar los campos del formulario
function validarFormulario() {
    let datosForm;
    if (clienteInput.value =="" || productoInput.value == "" || precioInput.value == "" || imagenInput.value == "" ) {
        alert("Todos los campos del formulario son obligatorios");
        
    }else{
        datosForm = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value
        }
    
    console.log(datosForm);
    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm;
    }
}

//funcion para guardar los datos en el localStorage
const listadoPedidos = "pedidos";
function guardarDatos(datos) {
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) || [];
    pedidosPrevios.push(datos);

    localStorage.setItem(listadoPedidos, JSON.stringify(pedidosPrevios));
    alert("Datos guardados con exito");
}   

//funsion para exytraer los datos del localStorage
function mostrarDatos() {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }

    pedidos.forEach( (p,i)=> {
      let fila = d.createElement("tr");
      fila.innerHTML = `
      <td>${i+1}</td>
      <td>${p.cliente}</td>
      <td>${p.producto}</td>
      <td>${p.precio}</td>
      <td><img src="${p.imagen}" alt="Imagen del producto" width="50"></td>
      <td>${p.observacion}</td>
      <td>
        <span onclick="actualizarPedido(${i})" class="btn editar btn btn-warning" >❌</span>
        <span onclick="eliminarPedido(${i})" class="btn eliminar btn btn-danger" >🗑️</span>
      </td>
      `;
      tabla.appendChild(fila);
    });
  }

//funcion para eliminar los datos del localStorage
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr");
    filas.forEach((f)=> {
        f.remove();  
    });
}

//funcion para eliminar un pedido del localStorage
function eliminarPedido(pos) {
      let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }
    let confirmar = confirm("¿Estás seguro de eliminar este pedido del cliente " + pedidos[pos].cliente + "?");
    if (confirmar) {
       pedidos.splice(pos, 1); // Eliminar el pedido en la posición indicada
       alert("Pedido eliminado con éxito");
       localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
       borrarTabla(); // Limpiar la tabla antes de mostrar los datos
       mostrarDatos(); // Mostrar los datos actualizados
    }
}

//funsion para actualizar pedidos
function actualizarPedido(pos) {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }

  clienteInput.value = pedidos[pos].cliente;
  productoInput.value = pedidos[pos].producto;
  precioInput.value = pedidos[pos].precio;
  imagenInput.value = pedidos[pos].imagen;
  observacionInput.value = pedidos[pos].observacion;

  posEditar = pos; // guardar índice

  btnActualizar.classList.toggle("d-none");
  btnGuardar.classList.toggle("d-none");
}

//evento para el botón actualizar
btnActualizar.addEventListener("click", function() {
    let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];
    if (posEditar !== null) {
      pedidos[posEditar].cliente = clienteInput.value;
      pedidos[posEditar].producto = productoInput.value;    
      pedidos[posEditar].precio = precioInput.value;
      pedidos[posEditar].imagen = imagenInput.value;
      pedidos[posEditar].observacion = observacionInput.value;
      localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
      alert(" el Pedido fue actualizado con éxito");

      clienteInput.value = "";
      productoInput.value = "";
      precioInput.value = "";
      imagenInput.value = "";
      observacionInput.value = "";

      btnActualizar.classList.toggle("d-none");
      btnGuardar.classList.toggle("d-none");        

      borrarTabla(); 
      mostrarDatos(); 
      posEditar = null;
    }
});

 //mostrar los datos del localStorage al cargar la pagina
d.addEventListener("DOMContentLoaded", () => {
    borrarTabla(); 
    mostrarDatos();
})
