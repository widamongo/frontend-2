//variables globales
const d= document;
let clienteInput= document.querySelector(".cliente");
let productoInput= d.querySelector(".producto");
let precioInput= d.querySelector(".precio");
let imagenInput= d.querySelector(".imagen");
let observacionInput= d.querySelector(".observacion");
let btnGuardar= d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table > tbody");

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
    //let pedidos = [];
    //extraer datos guardados previamente el LS
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) || [];
    //validar datos guardados en el LS
    // if (pedidosPrevios != null) {
    //     pedidos.push(pedidosPrevios);
    // }
    //agregar el pedido nuevo al array
    pedidosPrevios.push(datos);

    localStorage.setItem(listadoPedidos, JSON.stringify(pedidosPrevios));
    alert("Datos guardados con exito");
}   

//funsion para exytraer los datos del localStorage
function mostrarDatos() {
    let pedidos = [];
    //extraer datos guardados previamente el LS
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados en el LS
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }

    //console.log(pedidos);
    //mostrar los datos en la tabla
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
    //obtener el indice del elemento a eliminar
    let filas = d.querySelectorAll(".table tbody tr");
    //console.log(filas);
    filas.forEach((f)=> {
        f.remove();  
    });
}



//funcion para eliminar un pedido del localStorage
function eliminarPedido(pos) {
      let pedidos = [];
    //extraer datos guardados previamente el LS
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados en el LS
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }
    //confirmar pedido a eliminar
    let confirmar = confirm("¿Estás seguro de eliminar este pedido del cliente " + pedidos[pos].cliente + "?");
    if (confirmar) {
        //alert("Pedido eliminado con éxito");
       pedidos.splice(pos, 1); // Eliminar el pedido en la posición indicada
       alert("Pedido eliminado con éxito");
       // Guardar los cambios que quedan en el localStorage
       localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
       borrarTabla(); // Limpiar la tabla antes de mostrar los datos
       mostrarDatos(); // Mostrar los datos actualizados
    }
}

//funsion para actualizar pedidos
function actualizarPedido(pos) {
    let pedidos = [];
    //extraer datos guardados previamente el LS
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados en el LS
    if (pedidosPrevios != null) {
        pedidos= pedidosPrevios;
    }
    //pasar los datos del pedido a los campos del formulario
  clienteInput.value = pedidos[pos].cliente;
  productoInput.value = pedidos[pos].producto;
  precioInput.value = pedidos[pos].precio;
  imagenInput.value = pedidos[pos].imagen;
  observacionInput.value = pedidos[pos].observacion;
  //seleccionar el boton de actualizar
  let btnActualizar = d.querySelector(".btn-actualizar");
  btnActualizar.classList.toggle("d-none");
  btnGuardar.classList.toggle("d-none");
    //agregar evento click al boton de actualizar
  btnActualizar.addEventListener("click", function()  {
      pedidos[pos].cliente = clienteInput.value;
      pedidos[pos].producto = productoInput.value;    
      pedidos[pos].precio = precioInput.value;
      pedidos[pos].observacion = observacionInput.value;
      //guardar los datos editados en el localStorage
      localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
      alert(" el Pedido fue actualizado con éxito");

      clienteInput.value = "";
      productoInput.value = "";
      precioInput.value = "";
      observacionInput.value = "";

      btnActualizar.classList.toggle("d-none");
      btnGuardar.classList.toggle("d-none");        

      borrarTabla(); // Limpiar la tabla antes de mostrar los datos
      mostrarDatos(); // Mostrar los datos actualizados

    });
}

 //mostrar los datos del localStorage al cargar la pagina
d.addEventListener("DOMContentLoaded", () => {
    borrarTabla(); // Limpiar la tabla antes de mostrar los datos
    mostrarDatos();
    
})



