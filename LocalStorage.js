//variables globales
const d= document;
let clienteInput= document.querySelector(".cliente");
let productoInput= d.querySelector(".producto");
let precioInput= d.querySelector(".precio");
let imagenInput= d.querySelector(".imagen");
let observacionInput= d.querySelector(".observacion");
let btnGuardar= d.querySelector(".btn-guardar");

//agregar evento click al boton del formulario
btnGuardar.addEventListener("click", () => {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    guardarDatos(datos);
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
    }
    console.log(datosForm);
    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm;
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
